import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function extractSection(content, regexOptions) {
  for (const regex of regexOptions) {
    const match = content.match(regex);
    if (match) return match[1].trim();
  }
  return '';
}

async function main() {
  const srcDir = path.join('C:', 'Users', 'opare', 'OneDrive', 'Ananseum', 'Ai masterclass', 'content', 'course content', 'modules');
  const destDir = path.join(__dirname, 'src', 'content', 'modules');
  
  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
  }
  fs.mkdirSync(destDir, { recursive: true });
  
  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.md'));
  
  for (const file of files) {
    const rawContent = fs.readFileSync(path.join(srcDir, file), 'utf8');
    const slug = file.replace(/^\d+-/, '').replace(/\.md$/, '');
    const orderMatch = file.match(/^(\d+)/);
    const order = orderMatch ? parseInt(orderMatch[1], 10) : 1;
    const day = order <= 3 ? 1 : 2; 

    console.log(`Processing ${file}...`);
    
    const titleMatch = rawContent.match(/# Module \d+ — (.*)/);
    const title = titleMatch ? titleMatch[1].trim() : file;
    
    const durationMatch = rawContent.match(/\*\*Duration:\*\*\s*(.*)/);
    const duration = durationMatch ? durationMatch[1].trim() : "45 min";
    
    const objective = extractSection(rawContent, [
      /## Learning objectives\s+By the end of this module, participants should be able to:\s+([\s\S]*?)##/i,
      /## Learning objectives\s+([\s\S]*?)##/i
    ]);
    
    const deliveryLead = extractSection(rawContent, [
      /## Core message\s+([\s\S]*?)##/i
    ]);
    
    const takeaway = extractSection(rawContent, [
      /## Close this module with\s+> ([\s\S]*?)$/i,
      /## takeaway\s+([\s\S]*?)##/i
    ]);
    
    const talkingPoints = [];
    const flowSectionMatch = rawContent.match(/## Suggested flow\s+([\s\S]*?)## Teaching notes/i);
    if (flowSectionMatch) {
      const parts = flowSectionMatch[1].match(/### (.*)/g);
      if (parts) {
        parts.forEach(p => talkingPoints.push(p.replace(/^Part \d+ — /, '')));
      }
    }
    
    const frontmatterObj = {
      slug,
      day,
      order,
      title,
      duration,
      audience: "Executive cohort",
      objective: objective.replace(/\n-/g, ' -').replace(/\s+/g, ' ').trim() || "Analyze and implement AI capabilities safely.",
      deliveryLead: deliveryLead.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim() || "The goal is reliable deployment, not mere experimentation.",
      takeaway: takeaway.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim() || "Apply strict boundaries to generate true ROI.",
      talkingPoints: talkingPoints.length > 0 ? talkingPoints : [title, "Execution strategy", "Next steps"],
      downloads: ["course-guide"],
      keywords: ["ai", "executive", "strategy"],
      speakerNotes: ["Follow the structural outline closely."],
    };
    
    const fileContent = matter.stringify(rawContent, frontmatterObj);
    fs.writeFileSync(path.join(destDir, `${slug}.md`), fileContent);
    console.log(`Successfully mapped and saved ${slug}.md`);
  }
}

main().catch(console.error);
