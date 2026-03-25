# Ananseum Content Export

## Content Structure

### Source folders
- Learner content: `content/learner/`
- Course owner content: `content/course-owner/`

### Public download folders
- Learner downloads: `/downloads/learner/`
- Course owner downloads: `/downloads/course-owner/`

## Site Positioning

### Brand
- Ananseum
- Tagline: Modern AI in Practice
- Supporting line: Creative Web. Smart Tech.

### Product framing
- Presentation-first course website for leaders evaluating AI systems, coding agents, and orchestration platforms.
- Replaces a slide deck with a shareable, interactive learning surface.
- Includes downloadable course materials and a lightweight AI quiz coach.

### Brand direction currently reflected in the site
- Sharp, calm, credible, and intentional.
- Black and white foundation with restrained accent pink.
- Strong headings, sparse dividers, generous spacing, and minimal visual noise.

## Hero Content

### Eyebrow
- Ananseum Executive Course

### Title
- Modern AI in Practice

### Summary
- A presentation-first course website for leaders evaluating AI systems, coding agents, and orchestration platforms.

### Hero signals
- 2 days, 8 contact hours, executive-friendly
- Codex workflow literacy, OpenClaw orchestration, pilot design
- Presentation-first delivery with downloadable course assets

### Hero actions
- Enter story mode
- Open downloads

### Brand block
- Creative Web. Smart Tech.
- Black and white first. Pink only for hierarchy, interaction, and emphasis.

## Story Sections

### Day 1 intro
- Title: Foundations and Codex
- Summary: Establish the AI mental model, teach context engineering, and demonstrate Codex as a governed coding agent.

### Day 2 intro
- Title: Systems and Orchestration
- Summary: Connect the model and agent concepts to self-hosted orchestration, routed assistants, and pilot design.

### Demos and exercises section
- Title: Demos and Guided Exercises
- Summary: Anchor the course around three live demos and cumulative executive exercises rather than a static deck.
- Anchor demos:
  - Prompt/context quality comparison
  - End-to-end Codex software task
  - OpenClaw orchestration walkthrough
- Exercise cadence:
  - Every discussion output feeds the final pilot blueprint.

### Downloads section
- Title: Downloads Hub
- Summary: Give participants direct access to summaries, facilitator notes, worksheets, templates, and references.

### Capstone section
- Title: Pilot Blueprint
- Summary: End with one workflow each team could take into a 30-60-90 day adoption conversation.
- Blueprint fields:
  - Use case and user group
  - Context sources and tools
  - Human approvals and controls
  - Success metrics and 30-60-90 day next steps

### Final section
- Title: From Curiosity to Pilot
- Summary: Use the course outputs to align one realistic AI pilot, the controls around it, and the team that owns it.
- Final outcomes:
  - A mental model for modern AI systems
  - Operational understanding of Codex and OpenClaw
  - One realistic adoption blueprint
- Continue message:
  - Share the site as a cohort resource before, during, and after delivery.

## Course Modules

### 1. Welcome and Framing
- Day: 1
- Duration: 15 min
- Audience: Executive cohort
- Objective:
  - Set the course promise, align on outcomes, and position AI adoption as a workflow decision.
- Talking points:
  - What this course covers: practical AI systems, coding agents, orchestration, and adoption decisions.
  - Why executives need an operational model rather than a list of tools.
  - How the two days move from foundations to real deployment patterns.
- Exercise:
  - Title: Signal Scan
  - Prompt: Ask participants where AI is already appearing in their teams, and where the signal still feels noisy.
  - Output: A shortlist of internal use cases and skepticism themes to revisit later.
- Takeaway:
  - AI adoption becomes manageable when it is framed around bounded workflows and reviewable outcomes.
- Speaker notes:
  - Open by narrowing the scope: this is not a history of AI or a research seminar.
  - Use participant responses to personalize the examples later in the day.
- Related downloads:
  - Course Guide

### 2. The AI Map
- Day: 1
- Duration: 45 min
- Audience: Executive cohort
- Objective:
  - Give participants a shared mental model of AI, ML, GenAI, agents, multimodal systems, and automation.
- Talking points:
  - AI, machine learning, deep learning, and generative AI are related but not interchangeable.
  - Agents combine models, tools, memory, and workflow logic.
  - Coding agents and orchestration platforms sit inside the broader automation stack.
- Demo:
  - Title: From chatbot to workflow
  - Flow:
    - Show a generic chatbot answer to a business question.
    - Contrast it with a tool-using assistant that can route, retrieve, and act.
    - Tie the difference back to business value and control.
- Exercise:
  - Title: Use Case Sorting
  - Prompt: Have teams classify sample scenarios as chatbot, retrieval workflow, automation, or agentic system.
  - Output: A clearer sense of where different AI patterns belong.
- Takeaway:
  - A good AI program starts by choosing the right system type for the job, not the most impressive model.
- Speaker notes:
  - Keep the taxonomy practical; avoid academic detours.
  - Push participants to describe value and risk in the same sentence.
- Related downloads:
  - Module Summaries
  - Exercise Workbook

### 3. How Modern AI Works
- Day: 1
- Duration: 45 min
- Audience: Executive cohort
- Objective:
  - Explain models, tokens, context, retrieval, tools, memory, hallucinations, and evaluation in plain language.
- Talking points:
  - Models predict plausible next tokens; they do not reason like humans.
  - Context quality determines usefulness more than prompt tricks.
  - Retrieval, tool use, and evaluation are what make systems trustworthy enough to deploy.
- Exercise:
  - Title: Failure Diagnosis
  - Prompt: Review one flawed AI output and identify whether the failure came from poor context, bad prompting, missing retrieval, or weak review.
  - Output: A short explanation of which component failed and how to fix it.
- Takeaway:
  - Leaders can manage AI systems better when they understand their operating pieces and failure modes.
- Speaker notes:
  - Use simple language: tokens are units of text, not magic.
  - Keep evaluation visible as the bridge from novelty to trust.
- Related downloads:
  - Module Summaries

### 4. Prompting and Context Engineering
- Day: 1
- Duration: 45 min
- Audience: Executive cohort
- Objective:
  - Teach participants to move from vague asks to structured, reviewable task briefs.
- Talking points:
  - Prompting is task framing, not clever phrasing.
  - Good prompts define context, constraints, acceptance criteria, and verification steps.
  - Reusable task templates improve team consistency and safety.
- Demo:
  - Title: Weak ask to operational brief
  - Flow:
    - Start with a vague request such as "help with our AI strategy".
    - Refine it into a bounded request with scope, audience, and deliverable criteria.
    - Show how the improved brief changes the output quality.
- Exercise:
  - Title: Prompt Repair
  - Prompt: Rewrite weak prompts into strong task briefs that a coding or workflow agent could execute safely.
  - Output: Three revised prompts with context, output expectations, and guardrails.
- Takeaway:
  - Better context design leads to more reliable AI work than generic prompt hacks.
- Speaker notes:
  - This is the point where the audience should see prompt quality as operating discipline.
  - Tie back to internal standards and governance language.
- Related downloads:
  - Exercise Workbook

### 5. Codex Deep Dive
- Day: 1
- Duration: 45 min
- Audience: Executive cohort
- Objective:
  - Explain how Codex works as an AI coding agent across IDE, CLI, app, and cloud with approvals and sandboxing.
- Talking points:
  - Codex works best when it can inspect context, propose a plan, make changes, and validate the result.
  - Approvals, sandboxing, and network policies shape safe deployment.
  - Project guidance, repo context, and validation routines matter more than prompting theatrics.
- Exercise:
  - Title: Control Point Review
  - Prompt: Ask where approval checkpoints should exist for AI-assisted code changes in your organization.
  - Output: A rough map of high-trust, medium-trust, and restricted scenarios.
- Takeaway:
  - Codex is powerful when bounded by context, policy, and review discipline.
- Speaker notes:
  - Keep this practical: explain the workflow, not the branding.
  - Emphasize how technical and governance controls reinforce each other.
- Related downloads:
  - Facilitator Notes
  - Resource Sheet

### 6. Codex End-to-End Demo
- Day: 1
- Duration: 30 min
- Audience: Executive cohort
- Objective:
  - Show one complete AI-assisted software task from repo understanding through validation and summary.
- Talking points:
  - The human defines the task and acceptance criteria.
  - Codex inspects, plans, edits, and validates.
  - The human reviews the outcome, not every keystroke.
- Demo:
  - Title: Plan, implement, validate, summarize
  - Flow:
    - Ask Codex to explain the repository.
    - Request a concrete plan for a small change.
    - Have Codex implement and run checks.
    - Review the diff, the risks, and the validation result.
- Exercise:
  - Title: Review the Run
  - Prompt: Score the demo on usefulness, risk, reviewability, and rollout readiness.
  - Output: A short executive assessment of where this would fit today.
- Takeaway:
  - Trust comes from observable workflow and validation, not from blind confidence in the model.
- Speaker notes:
  - Use a safe demo repository and keep the task intentionally small.
  - Have backup screenshots ready in case the live run fails.
- Related downloads:
  - Facilitator Notes

### 7. Recap and Reflection
- Day: 2
- Duration: 15 min
- Audience: Executive cohort
- Objective:
  - Reset the room, reinforce the core model, and surface unresolved concerns.
- Talking points:
  - What mattered most from Day 1.
  - What questions still block adoption decisions.
  - How Day 2 shifts from tools to systems and rollout design.
- Exercise:
  - Title: Risk and Opportunity Pairing
  - Prompt: Each pair names one high-value use case and one risk that must be designed around.
  - Output: A balanced starting point for the systems discussion.
- Takeaway:
  - The goal is not confidence theater; it is disciplined readiness.
- Speaker notes:
  - Use this module to refresh energy and sharpen focus for the second half.
- Related downloads:
  - Course Guide

### 8. Building Real AI Systems
- Day: 2
- Duration: 45 min
- Audience: Executive cohort
- Objective:
  - Move from chatbot thinking to workflow/system thinking with RAG, tools, memory, orchestration, and human oversight.
- Talking points:
  - RAG improves grounded answers, but it does not automatically create a workflow.
  - Agentic systems add tool use, state, routing, and controlled action.
  - Human oversight is a design component, not a fallback afterthought.
- Exercise:
  - Title: System Mapping
  - Prompt: Map one internal process to the components of an AI system: model, context, tools, approvals, and outputs.
  - Output: A rough systems sketch for one candidate workflow.
- Takeaway:
  - Real value comes from connecting models to useful systems with clear control boundaries.
- Speaker notes:
  - This is the bridge into OpenClaw; make the orchestration need obvious.
- Related downloads:
  - Exercise Workbook
  - Pilot Blueprint Template

### 9. Codex Practical Lab
- Day: 2
- Duration: 45 min
- Audience: Executive cohort
- Objective:
  - Let leaders inspect an AI-assisted coding task using a review rubric rather than deep hands-on execution.
- Talking points:
  - A good AI workflow can be evaluated by clarity, validation, and risk posture.
  - Executives do not need to code to judge whether the operating model is sound.
  - Small, bounded tasks are the right entry point for pilots.
- Exercise:
  - Title: Executive Review Rubric
  - Prompt: Use the rubric to assess a bug fix or refactor task completed by Codex.
  - Output: A go, no-go, or pilot recommendation with rationale.
- Takeaway:
  - Operational inspection skills matter more than technical spectacle.
- Speaker notes:
  - Treat the lab as a decision-making exercise, not a coding lesson.
- Related downloads:
  - Exercise Workbook

### 10. OpenClaw Architecture and Setup
- Day: 2
- Duration: 45 min
- Audience: Executive cohort
- Objective:
  - Position OpenClaw as a self-hosted orchestration layer for multi-channel assistants and routed sessions.
- Talking points:
  - OpenClaw connects channels, providers, nodes, and sessions into a durable assistant layer.
  - Self-hosting changes the trust, data, and governance conversation.
  - Architecture matters because orchestration multiplies both value and risk.
- Exercise:
  - Title: Ownership Map
  - Prompt: Identify which internal teams would own platform operations, security review, workflow design, and business adoption.
  - Output: A draft RACI for an orchestration platform.
- Takeaway:
  - Orchestration platforms turn isolated AI use into a managed operating capability.
- Speaker notes:
  - Keep the architecture diagram readable and role-based.
- Related downloads:
  - Resource Sheet
  - Facilitator Notes

### 11. Skills, ClawHub, and Codex Inside OpenClaw
- Day: 2
- Duration: 45 min
- Audience: Executive cohort
- Objective:
  - Explain reusable skills, external agent runtimes, and how Codex can operate inside OpenClaw-managed workflows.
- Talking points:
  - Skills package repeatable instructions and task conventions.
  - ClawHub distributes those capabilities across environments.
  - ACP sessions allow external agent runtimes, including coding harnesses, to plug into routed workflows.
- Exercise:
  - Title: Guardrail Design Review
  - Prompt: Discuss which guardrails are required before connecting a coding agent to a routed assistant platform.
  - Output: A shortlist of non-negotiable controls for production pilots.
- Takeaway:
  - Composable skills and external runtimes create leverage only when governance keeps pace.
- Speaker notes:
  - Use this module to show how platform and agent layers meet.
- Related downloads:
  - Resource Sheet
  - Pilot Blueprint Template

### 12. Capstone Workflow Workshop
- Day: 2
- Duration: 30 min
- Audience: Executive cohort
- Objective:
  - Turn the course into one actionable pilot blueprint for each team.
- Talking points:
  - Choose a use case with clear value, bounded risk, and measurable outcomes.
  - Define users, approvals, data sources, and success metrics before tooling decisions harden.
  - Keep the first pilot small enough to govern and big enough to matter.
- Exercise:
  - Title: Pilot Blueprint
  - Prompt: Complete the template for one AI-assisted workflow your organization could pilot in 30 to 90 days.
  - Output: A completed pilot blueprint with owners, controls, and success metrics.
- Takeaway:
  - A good pilot is specific, measurable, and governable from day one.
- Speaker notes:
  - End with commitment language: one pilot, one owner, one review cycle.
- Related downloads:
  - Pilot Blueprint Template

## Downloads Hub Content

### 1. Course Guide
- Category: Learner Pack
- Description:
  - A concise overview of the two-day course, learning outcomes, and pacing.
- File:
  - `/downloads/learner/course-guide.md`

### 2. Module Summaries
- Category: Learner Pack
- Description:
  - One-page summaries of all twelve modules for post-session review.
- File:
  - `/downloads/learner/module-summaries.md`

### 3. Facilitator Notes
- Category: Facilitator Pack
- Description:
  - Teaching cues, pacing notes, and fallback prompts for each module.
- File:
  - `/downloads/course-owner/facilitator-notes.md`

### 4. Exercise Workbook
- Category: Worksheet
- Description:
  - Discussion prompts, review rubrics, and space to capture group outputs.
- File:
  - `/downloads/learner/exercise-workbook.md`

### 5. Pilot Blueprint Template
- Category: Template
- Description:
  - A fillable template for designing one practical AI pilot workflow.
- File:
  - `/downloads/learner/pilot-blueprint-template.md`

### 6. Resource Sheet
- Category: Resource
- Description:
  - Recommended readings, official docs, and implementation references.
- File:
  - `/downloads/learner/resource-sheet.md`

### 7. Delivery Runbook
- Category: Facilitator Pack
- Description:
  - Presenter flow, timing checkpoints, and section transition cues.
- File:
  - `/downloads/course-owner/delivery-runbook.md`

### 8. Module Delivery Notes
- Category: Facilitator Pack
- Description:
  - Owner-only module notes with objectives, cues, and emphasis points.
- File:
  - `/downloads/course-owner/module-delivery-notes.md`

### 9. Demo Guide
- Category: Facilitator Pack
- Description:
  - Step-by-step guidance for the live Codex and OpenClaw walkthroughs.
- File:
  - `/downloads/course-owner/demo-guide.md`

## Download File Body Content

### learner/course-guide.md
```md
# Course Guide

## Course
Modern AI in Practice: Foundations, Codex, and OpenClaw

## Format
- 2 days
- 8 contact hours
- Executive-friendly, demo-led

## Outcomes
- Understand the modern AI landscape without hype.
- Evaluate coding agents and orchestration platforms with practical criteria.
- Leave with one pilot blueprint to advance internally.
```

### module-summaries.md
```md
# Module Summaries

## Highlights
- AI landscape and systems model
- Prompting and context engineering
- Codex workflow, validation, and governance
- OpenClaw orchestration, skills, and routed assistants
- Capstone pilot blueprint

## What learners should retain
- AI systems are most useful when they are bounded and reviewable.
- Context quality matters more than prompt tricks.
- Codex and OpenClaw are examples of workflow-enabled AI, not isolated chat tools.
```

### course-owner/facilitator-notes.md
```md
# Facilitator Notes

## Delivery guidance
- Keep concepts plain and operational.
- Use live demos selectively and keep backup screenshots available.
- Tie each exercise back to the final pilot blueprint.

## Presenter reminders
- Emphasize controls alongside capability.
- Keep the room focused on bounded, reviewable workflows.
```

### learner/exercise-workbook.md
```md
# Exercise Workbook

## Included activities
- Use case sorting
- Failure diagnosis
- Prompt repair
- Control point review
- System mapping
- Executive review rubric

Use this workbook to capture team outputs during the course.
```

### learner/pilot-blueprint-template.md
```md
# Pilot Blueprint Template

## Use Case

## User Group

## Context Sources

## Tools and Systems

## Human Approvals

## Success Metrics

## Risks and Controls

## 30-60-90 Day Next Steps
```

### learner/resource-sheet.md
```md
# Resource Sheet

## Recommended references
- OpenAI Codex documentation
- OpenAI Codex best practices
- OpenAI approvals and sandboxing guidance
- OpenClaw documentation
- OpenClaw skills and ACP session documentation
```

### course-owner/delivery-runbook.md
```md
# Delivery Runbook

## Story flow
1. Open with the course promise and reset expectations.
2. Use Day 1 to establish the system model and Codex workflow.
3. Use Day 2 to connect orchestration, governance, and pilot design.
4. End with one concrete pilot per team.

## Timing checkpoints
- Keep concept sections concise.
- Protect the live demo windows.
- Leave enough time for the capstone blueprint.

## Transitions
- Move from concepts to systems.
- Move from tool capability to operating controls.
- Move from examples to one adoption decision.
```

### course-owner/module-delivery-notes.md
```md
# Module Delivery Notes

## Day 1 emphasis
- Focus on shared understanding, not technical depth.
- Use Codex as the concrete example of an agentic workflow.

## Day 2 emphasis
- Position OpenClaw as orchestration infrastructure.
- Keep governance visible throughout.

## Delivery posture
- Be clear, direct, and practical.
- Remove jargon where a simpler sentence will do.
```

### course-owner/demo-guide.md
```md
# Demo Guide

## Demo 1: Prompt and context quality
- Start with a weak prompt.
- Improve the task framing.
- Compare the results and call out what changed.

## Demo 2: Codex workflow
- Ask for repository understanding.
- Request a plan.
- Implement a small change.
- Run checks and review the result.

## Demo 3: OpenClaw workflow walkthrough
- Show channels, routing, skills, and session flow.
- Explain where Codex fits as an external agent runtime.
- End on governance controls, not technical novelty.
```

## Quiz Coach Content Rules

### Purpose
- Answer questions about course modules and terminology.
- Recommend the next section based on user goals or confusion.
- Run short knowledge checks after major sections.
- Point users to the right downloadable materials.

### Current guidance behavior
- If a user asks about downloads, worksheets, or templates:
  - Recommend the Downloads Hub.
  - Return all course assets as related downloads.
- If a user asks where to start or what comes next:
  - Recommend starting with the hero and Day 1 flow.
  - Suggest the Course Guide and Pilot Blueprint Template.
- Otherwise:
  - Match the question to the closest module.
  - Return a short answer, a recommended section, and one quick-check quiz.

## Presenter Controls and Navigation Labels

### Top bar
- Learner view / Presenter view
- Hide notes / Show notes
- Downloads

### Presenter rail
- Progress indicator
- Section dot navigation
- Previous
- Next

### Module page links
- Back to story mode
- Open downloads

## Contact Placeholder
- `hello@ananseum.com`
