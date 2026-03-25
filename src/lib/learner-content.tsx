import React, { useState } from "react";

export type LearnerContentData = {
  overview?: React.ReactNode;
  example?: React.ReactNode;
  prompts?: React.ReactNode;
  practice?: React.ReactNode;
  mistakes?: React.ReactNode;
};

export const learnerContentMap: Record<string, LearnerContentData> = {
  "ai-landscape-and-systems": {
    overview: (
      <>
        <p>When people say "AI," they often mean very different things. Sometimes they mean a model like a chatbot. Sometimes they mean a workflow that uses a model. Sometimes they mean an entire business system that combines a model, tools, data, people, and approvals.</p>
        <p>A useful learner mindset is this:</p>
        <p><strong>A model generates language. A system gets real work done.</strong></p>
        <p>A large language model can draft, summarize, classify, compare, transform, and explain text. But on its own, it does not know your business rules, your source of truth, your customer commitments, or your approval process. That is why useful AI work usually depends on more than the model.</p>
        <p><strong>A simple systems model has six parts:</strong></p>
        <ul className="signal-list" style={{ marginTop: '1rem' }}>
          <li><strong>1. Task:</strong> What job is the system trying to do?</li>
          <li><strong>2. Instructions:</strong> What is the model being asked to do, and what rules must it follow?</li>
          <li><strong>3. Context and data:</strong> What background, documents, examples, or records does it need?</li>
          <li><strong>4. Tools and actions:</strong> Does it need to search, calculate, send, fetch, update, or classify?</li>
          <li><strong>5. Human review:</strong> Where does a person approve, correct, or override the result?</li>
          <li><strong>6. Evaluation and governance:</strong> How do you know it worked, and how do you keep it safe?</li>
        </ul>
      </>
    ),
    example: (
      <>
        <p>Imagine a team wants AI to help with customer support.</p>
        <p>A <strong>model-only</strong> approach might be:</p>
        <ul>
          <li>paste in a support ticket</li>
          <li>ask the AI to draft a reply</li>
        </ul>
        <p>That may produce fluent language, but it will often miss important facts.</p>
        <p>A <strong>system approach</strong> would be:</p>
        <ul>
          <li>read the customer message</li>
          <li>check account details</li>
          <li>retrieve help center content</li>
          <li>draft a reply in the company tone</li>
          <li>flag high-risk cases for human review</li>
          <li>log the interaction</li>
        </ul>
        <p>That is the difference between text generation and workflow support.</p>
      </>
    ),
    prompts: (
      <>
        <p className="eyebrow">Reusable learner prompt</p>
        <pre className="prompt-block"><code> हेल्प me map this work problem into an AI system.

Problem: [Describe the business task]
Users: [Who uses it]
Inputs: [What information comes in]
Desired output: [What a good result looks like]
Available data: [Docs, databases, policies, examples]
Possible tools: [Search, CRM lookup, calculator, ticketing, etc.]
Risks: [Errors, privacy, compliance, customer impact]

Return:
1. what the model should do
2. what must come from data or retrieval
3. what tools are needed
4. where human review should happen
5. the smallest pilot scope
6. 3 success metrics</code></pre>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>Treating the model like it already knows your organization</li>
          <li>Starting with the tool instead of the workflow</li>
          <li>Trying to automate a process nobody has clearly defined</li>
          <li>Skipping human review in high-risk tasks</li>
          <li>Measuring success by how impressive the output sounds instead of whether it helps the user</li>
        </ul>
      </>
    ),
    practice: (
      <>
        <p>Take one recurring task from your team, such as writing weekly updates, answering repeated questions, or reviewing incoming requests. Break it into:</p>
        <ul>
          <li>what is reasoning</li>
          <li>what is retrieval</li>
          <li>what is action</li>
          <li>what needs human approval</li>
        </ul>
        <p>That is your first systems map.</p>
      </>
    )
  },
  "context-engineering-and-prompting": {
    overview: (
      <>
        <p>Most poor AI output is not caused by bad models. It is caused by unclear task design.</p>
        <p>A model performs better when you tell it:</p>
        <ul>
          <li>what job it is doing</li>
          <li>why that job matters</li>
          <li>who the output is for</li>
          <li>what source material to use</li>
          <li>what constraints to follow</li>
          <li>how the answer will be judged</li>
        </ul>
        <p>That is why good prompting is really <strong>good briefing</strong>.</p>
        <p><strong>A practical briefing framework:</strong></p>
        <ul className="signal-list" style={{ marginTop: '1rem' }}>
          <li><strong>Task</strong> — what should the AI produce?</li>
          <li><strong>Goal</strong> — what practical outcome do you need?</li>
          <li><strong>Audience</strong> — who is this for?</li>
          <li><strong>Context</strong> — what background matters?</li>
          <li><strong>Inputs</strong> — what documents, notes, or examples should it use?</li>
          <li><strong>Constraints</strong> — what must it include or avoid?</li>
          <li><strong>Process</strong> — should it ask questions, outline first, draft, compare options?</li>
          <li><strong>Acceptance criteria</strong> — what makes the output usable?</li>
        </ul>
      </>
    ),
    example: (
      <>
        <p>Suppose you want AI to help summarize customer feedback. The difference between a weak prompt and a useful brief:</p>
        <p><strong>Weak prompt</strong></p>
        <pre className="prompt-block"><code>Summarize this feedback.</code></pre>
        <p><strong>Better task brief</strong></p>
        <pre className="prompt-block"><code>Analyze the customer feedback below for a product manager.

Goal:
Identify the 5 most important themes that affect retention and onboarding.

Audience:
Product manager and customer success lead.

Instructions:
- group comments into themes
- include a short explanation of each theme
- note whether each theme is positive, negative, or mixed
- highlight direct product issues vs training/documentation issues
- include 3 representative quotes
- finish with 3 recommended actions

Constraints:
- do not invent details not present in the feedback
- keep the summary under 400 words
- use plain business language

Feedback:
[paste text]</code></pre>
      </>
    ),
    prompts: (
      <>
        <p className="eyebrow">Reusable learner prompt template</p>
        <pre className="prompt-block"><code>You are helping with [type of work].

Task: [What to produce]
Goal: [Why it matters]
Audience: [Who this is for]
Context: [Relevant background]
Inputs: [Text, notes, documents, examples]
Constraints: [Length, tone, format, must include, must avoid]
Process: [Ask clarifying questions first / outline first / give options first]
Acceptance criteria: [A good result must include...]

Now complete the task.</code></pre>
        <p className="eyebrow" style={{marginTop:'1.5rem'}}>Ask the AI to improve your brief</p>
        <pre className="prompt-block"><code>Here is my draft request. Rewrite it as a complete AI task brief with: task, goal, audience, context, inputs, constraints, process, and acceptance criteria. Then show me what is still missing.</code></pre>
        <p className="eyebrow" style={{marginTop:'1.5rem'}}>Ask the AI to diagnose failure</p>
        <pre className="prompt-block"><code>The output below was not useful. Diagnose why it failed. 
Check for: vague task definition, missing context, missing source material, weak constraints, missing review steps, missing acceptance criteria. 
Then rewrite the prompt so it is more likely to succeed.</code></pre>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>Asking for a "final answer" too early</li>
          <li>Mixing several tasks into one vague instruction</li>
          <li>Providing no source material but expecting accuracy</li>
          <li>Using words like "better," "professional," or "clear" without defining what they mean</li>
          <li>Forgetting to specify who the output is for</li>
        </ul>
      </>
    ),
    practice: (
      <>
        <p>Take a vague request you use often, such as "write this email," "summarize this meeting," or "draft a proposal." Rewrite it using the briefing framework above. The quality difference will be obvious.</p>
      </>
    )
  },
  "codex-workflows-validation-and-governance": {
    overview: (
      <>
        <p>In this course, think of <strong>Codex workflows</strong> as AI-assisted coding and technical build workflows. The same lesson applies here as everywhere else: AI can generate useful drafts quickly, but it still needs clear specs, validation, and control.</p>
        <p>A good mental model is: <strong>AI can help produce code. It does not remove the need for engineering discipline.</strong></p>
        <p><strong>A safe workflow for AI-assisted coding:</strong></p>
        <ul className="signal-list" style={{ marginTop: '1rem' }}>
          <li><strong>1. Define the task clearly:</strong> What should the code do?</li>
          <li><strong>2. Ask for a plan first:</strong> Do not start with "write the full solution."</li>
          <li><strong>3. Generate tests or acceptance criteria:</strong> Know what correct behavior looks like before trusting the code.</li>
          <li><strong>4. Build in small increments:</strong> One function, one endpoint, one component at a time.</li>
          <li><strong>5. Validate:</strong> Run tests, lint, type check, and inspect edge cases.</li>
          <li><strong>6. Review governance and security:</strong> Check secrets, dependencies, permissions, logs, and failure paths.</li>
        </ul>
      </>
    ),
    example: (
      <>
        <p>Suppose you want a small Python script to process a CSV of invoices.</p>
        <p><strong>Weak prompt</strong></p>
        <pre className="prompt-block"><code>Write Python code to process this invoice file.</code></pre>
        <p><strong>Better prompt</strong></p>
        <pre className="prompt-block"><code>You are assisting with a Python utility.

Task: Create a script that reads a CSV of invoices and flags rows with missing invoice number, vendor, or amount.
Environment: Python 3.11. Standard library only.

Requirements:
- input file path from command line
- output a cleaned CSV and a validation report
- do not crash on malformed rows
- include unit tests
- explain edge cases

Process:
1. propose the approach
2. write test cases
3. write the implementation
4. explain assumptions and risks

Acceptance criteria: deterministic output, malformed rows handled gracefully, tests cover missing fields and invalid numeric values.</code></pre>
      </>
    ),
    prompts: (
      <>
        <p className="eyebrow">Spec-to-code</p>
        <pre className="prompt-block"><code>Turn this requirement into:
1. a technical plan
2. test cases
3. implementation steps
4. risks and unknowns

Requirement:
[paste requirement]</code></pre>
        <p className="eyebrow" style={{marginTop:'1.5rem'}}>Code review</p>
        <pre className="prompt-block"><code>Review this code for: correctness, edge cases, readability, security risks, unnecessary complexity, missing tests. Then suggest the smallest safe improvements.</code></pre>
        <p className="eyebrow" style={{marginTop:'1.5rem'}}>Refactor without changing behavior</p>
        <pre className="prompt-block"><code>Refactor the code below for clarity and maintainability. Do not change behavior. Show: 1. what you changed, 2. why you changed it, 3. any risks to verify with tests.</code></pre>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>Using AI when requirements are unclear</li>
          <li>Forgetting that the system depends on hidden business rules</li>
          <li>Overlooking security-sensitive decisions</li>
          <li>Trusting code needs production-level performance tuning without real context</li>
          <li>Deploying without a human checking the output</li>
        </ul>
      </>
    ),
    practice: (
      <>
        <p>Choose a small, non-critical technical task: rename files consistently, transform a CSV, parse logs, or format a JSON export.</p>
        <p>Ask the AI for: 1. a plan, 2. tests, 3. code, 4. review notes.</p>
        <p>This helps learners see that <strong>validation is part of the workflow, not an optional extra</strong>.</p>
      </>
    )
  },
  "ai-systems-rag-tools-memory-evaluation": {
    overview: (
      <>
        <p>Once you move beyond simple prompting, you start building systems that combine the model with knowledge, actions, and measurement.</p>
        <p>Here are four core ideas:</p>
        <ul className="signal-list" style={{ marginTop: '1rem' }}>
          <li><strong>RAG:</strong> retrieve relevant information at runtime so the model can answer using real sources</li>
          <li><strong>Tools:</strong> let the system take controlled actions, like searching, calculating, or looking up records</li>
          <li><strong>Memory:</strong> allow the system to retain useful context across turns or sessions</li>
          <li><strong>Evaluation:</strong> measure whether the system is actually working</li>
        </ul>
      </>
    ),
    example: (
      <>
        <p>Imagine an internal HR policy assistant. A user asks: <em>"Can contractors work remotely outside the country for more than 30 days?"</em></p>
        <p>A plain chatbot may guess. A RAG-based assistant would:</p>
        <ul>
          <li>search the HR and legal policy library</li>
          <li>retrieve the relevant travel and employment rules</li>
          <li>answer using only those sources</li>
          <li>flag ambiguity if the documents conflict</li>
          <li>direct the user to HR if approval is required</li>
        </ul>
        <p>That is more useful because the answer is <strong>grounded</strong>.</p>
      </>
    ),
    prompts: (
      <>
        <p className="eyebrow">Grounded answer prompt</p>
        <pre className="prompt-block"><code>Answer the question using only the supplied sources.

Question: [user question]
Sources: [paste retrieved text]

Instructions:
- give a direct answer first
- cite the source section or document title
- if the sources are insufficient, say so clearly
- do not guess beyond the provided material
- include any important ambiguity</code></pre>
        <p className="eyebrow" style={{marginTop:'1.5rem'}}>RAG system design prompt</p>
        <pre className="prompt-block"><code>Help me design a RAG workflow for this use case.

Use case: [describe use case]
Users: [who asks questions]
Source material: [policies, docs, knowledge base, contracts, manuals]

Return:
1. what content should be indexed
2. what should not be indexed
3. what metadata matters
4. what the answer format should be
5. where human escalation is needed
6. how to evaluate quality</code></pre>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>Stuffing too many irrelevant documents into retrieval</li>
          <li>Assuming retrieval quality is good without testing it</li>
          <li>Using memory without clear rules for what should persist</li>
          <li>Letting the model answer without citing or grounding itself</li>
          <li>Evaluating only on "did it sound good?"</li>
        </ul>
      </>
    ),
    practice: (
      <>
        <p>Pick a knowledge-heavy workflow, such as HR policy, customer support knowledge, or internal operations rules. Decide:</p>
        <ul>
          <li>what should be retrieved</li>
          <li>what tool calls might be needed</li>
          <li>what memory is actually useful</li>
          <li>how you would test whether the answers are grounded</li>
        </ul>
      </>
    )
  },
  "openclaw-orchestration-skills-and-security": {
    overview: (
      <>
        <p>In this course, <strong>OpenClaw</strong> is the orchestration layer: the part that coordinates models, tools, skills, approvals, and system logic into a working AI workflow.</p>
        <p>A useful learner definition is:</p>
        <ul>
          <li><strong>Orchestration decides what happens next.</strong></li>
          <li><strong>Skills package repeatable capabilities.</strong></li>
          <li><strong>Security controls what is allowed.</strong></li>
        </ul>
        <p>A single prompt handles one interaction. Orchestration handles a sequence of interactions (classify request, route to skill, retrieve context, call tool, draft output, log result).</p>
      </>
    ),
    example: (
      <>
        <p>Imagine a procurement intake assistant. A user submits: <em>"We want to onboard a new vendor for document processing."</em></p>
        <p>An orchestrated workflow could:</p>
        <ol>
          <li>classify the request type</li>
          <li>retrieve procurement policy</li>
          <li>use a vendor risk skill</li>
          <li>ask follow-up questions if key fields are missing</li>
          <li>draft a recommendation</li>
          <li>send high-risk cases for review</li>
          <li>log the decision</li>
        </ol>
        <p>That is not one prompt. It is an orchestrated flow.</p>
      </>
    ),
    prompts: (
      <>
        <p className="eyebrow">Design a skill</p>
        <pre className="prompt-block"><code>Design a reusable AI skill for this task: [describe task]. Include: purpose, ideal input, required context, tools needed, output format, constraints, failure conditions, when to escalate to a human, 3 security risks.</code></pre>
        <p className="eyebrow" style={{marginTop:'1.5rem'}}>Design an orchestrated workflow</p>
        <pre className="prompt-block"><code>Map this business process into an orchestrated AI workflow. Return: 1. trigger, 2. decision points, 3. skills required, 4. tool calls, 5. human approvals, 6. logging/audit needs, 7. failure handling.</code></pre>
        <p className="eyebrow" style={{marginTop:'1.5rem'}}>Red-team the workflow</p>
        <pre className="prompt-block"><code>Review this AI workflow for security and control risks. Check for: prompt injection risk, overbroad permissions, data leakage, missing approvals, unclear audit trail, weak failure handling, inappropriate memory persistence. Then recommend the smallest effective safeguards.</code></pre>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>Giving one skill too many unrelated jobs</li>
          <li>Allowing tool access without clear permissions</li>
          <li>Skipping audit and logging</li>
          <li>Assuming retrieved content is always safe or trustworthy</li>
          <li>Forgetting that "helpful" systems can still leak data or take the wrong action</li>
        </ul>
      </>
    ),
    practice: (
      <>
        <p>Choose a workflow with moderate risk, such as procurement intake, policy Q&A, or request triage. Break it into: route, retrieve, decide, act, review, log. That is the beginning of an orchestrated design.</p>
      </>
    )
  }
};

export const learnerInterstitials: Record<string, LearnerContentData> = {
  "capstone": {
    overview: (
      <>
        <p>The capstone is where learners turn AI ideas into a small, credible pilot.</p>
        <p>The goal is <strong>not</strong> to design the biggest possible transformation. The goal is to design a pilot that is:</p>
        <ul>
          <li>narrow enough to execute</li>
          <li>useful enough to matter</li>
          <li>measurable enough to evaluate</li>
          <li>safe enough to approve</li>
        </ul>
        <p>Avoid things like "We want to use AI somewhere in operations" and instead identify a specific job, like classifying ticket urgency.</p>
      </>
    ),
    example: (
      <>
        <p><strong>Pilot idea:</strong> AI-assisted support ticket triage</p>
        <ul>
          <li><strong>Problem:</strong> support agents spend too much time sorting repeat tickets</li>
          <li><strong>Users:</strong> support operations team</li>
          <li><strong>AI role:</strong> classify ticket type, urgency, and suggested knowledge article</li>
          <li><strong>Inputs:</strong> incoming ticket text, customer tier, help center content</li>
          <li><strong>Output:</strong> triage recommendation and draft routing</li>
          <li><strong>Human review:</strong> agents approve before the response is sent</li>
          <li><strong>Success metrics:</strong> faster triage time, fewer misrouted tickets, better consistency</li>
          <li><strong>Risks:</strong> incorrect urgency classification, missed edge cases</li>
          <li><strong>Scope:</strong> English tickets only, top 5 categories only, no automatic sending</li>
        </ul>
      </>
    ),
    prompts: (
      <>
        <p className="eyebrow">Capstone Prompt</p>
        <pre className="prompt-block"><code>Turn this rough idea into a 6-week AI pilot blueprint. Idea: [paste rough idea]. Return: 1. problem statement, 2. target users, 3. current workflow, 4. where AI should help, 5. inputs and data sources, 6. human review points, 7. risks and controls, 8. success metrics, 9. what is out of scope, 10. a simple 6-week pilot plan.</code></pre>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>Choosing too broad a problem</li>
          <li>Starting with a chatbot instead of a workflow</li>
          <li>Defining no baseline metrics</li>
          <li>Automating before understanding where failure is acceptable</li>
          <li>Mixing pilot goals, rollout goals, and long-term strategy</li>
        </ul>
      </>
    ),
    practice: (
      <>
        <p>Write a pilot blueprint for one real workflow from your team. Then shrink the scope by half. The smaller version is usually the better first pilot.</p>
      </>
    )
  },
  "demos": {
    overview: (
      <>
        <p>Demos are useful when learners do more than watch. The point is not to admire the tool. The point is to understand:</p>
        <ul>
          <li>why the output was good or bad</li>
          <li>what context was added</li>
          <li>where grounding happened</li>
          <li>what review and control steps were used</li>
        </ul>
        <p>A good learner watches a demo and asks: <strong>What made this work? What would make it fail?</strong></p>
      </>
    ),
    practice: (
      <>
        <p><strong>Exercise 1: Fix a vague prompt.</strong> Turn a weak request into a complete brief. Add audience, context, constraints, review steps, and acceptance criteria.</p>
        <p><strong>Exercise 2: Design a grounded answer.</strong> Build a simple RAG-style response. Answer using only the sources, cite the sources, say when the answer is uncertain.</p>
        <p><strong>Exercise 3: Review AI-generated code.</strong> Spot validation and security gaps. Identify missing tests, flag edge cases, note privacy risks.</p>
        <p><strong>Exercise 4: Turn an idea into a pilot.</strong> Move from curiosity to action. Define the workflow, narrow the scope, identify success metrics, define human review.</p>
      </>
    ),
    mistakes: (
      <>
        <p>What good learners do during demos:</p>
        <ul>
          <li>predict the likely failure before the presenter reveals it</li>
          <li>compare weak and strong prompts</li>
          <li>ask what data or tool made the difference</li>
          <li>identify where a human should stay in the loop</li>
          <li>note what would be risky to automate</li>
        </ul>
      </>
    )
  },
  "downloads": {
    overview: (
      <>
        <p>The Downloads Hub is the learner’s toolkit. These resources are meant to be used after the session, not just collected.</p>
        <p>A good resource pack helps learners do three things: structure a task, evaluate a result, and move an idea into a pilot.</p>
        <p><strong>Best way to use the Downloads Hub:</strong></p>
        <p>Do not open everything at once. Start with:</p>
        <ol>
          <li>Task Brief Template</li>
          <li>Validation Checklist</li>
          <li>Pilot Blueprint Worksheet</li>
        </ol>
        <p>Those three resources cover most real-world starting points.</p>
      </>
    ),
    prompts: (
      <>
        <p className="eyebrow">Prompt to help learners choose the right resource</p>
        <pre className="prompt-block"><code>I am working on this AI use case: [paste use case]. Tell me which of these resources I should use first: task brief template, prompt patterns pack, validation checklist, governance checklist, RAG design canvas, pilot blueprint worksheet, evaluation scorecard. Then explain why in plain language.</code></pre>
      </>
    )
  },
  "final": {
    overview: (
      <>
        <p>Many teams stay stuck in curiosity mode. They try a few prompts, get a few impressive outputs, and then stall because nothing turns into a workflow, an owner, a metric, or a decision.</p>
        <p>The move from curiosity to pilot happens when the team shifts from <em>"This is interesting"</em> to <em>"This is a real workflow we can test safely"</em>.</p>
        <p><strong>The maturity path:</strong> 1. Curiosity, 2. Use-case discovery, 3. Workflow framing, 4. Controlled testing, 5. Pilot, 6. Scale decision.</p>
      </>
    ),
    mistakes: (
      <>
        <p><strong>Signs a team is still in curiosity mode:</strong></p>
        <ul>
          <li>no workflow has been clearly defined</li>
          <li>no owner is accountable</li>
          <li>no baseline metric exists</li>
          <li>nobody has decided what success looks like</li>
          <li>the conversation is mostly about tools, not tasks</li>
        </ul>
      </>
    ),
    prompts: (
      <>
        <p className="eyebrow">Reusable learner prompt</p>
        <pre className="prompt-block"><code>Help me move this AI idea from curiosity to pilot. Idea: [paste idea]. Return: 1. whether this is a real workflow or just a general interest area, 2. the smallest useful pilot scope, 3. the owner and stakeholders, 4. the inputs and outputs, 5. the review and control steps, 6. 3 measurable success metrics, 7. a 30-day action plan.</code></pre>
      </>
    ),
    practice: (
      <>
        <p><strong>30-day learner action plan:</strong></p>
        <ul>
          <li><strong>Week 1:</strong> Choose one workflow and define the task clearly</li>
          <li><strong>Week 2:</strong> Create a task brief, sample inputs, and acceptance criteria</li>
          <li><strong>Week 3:</strong> Run controlled tests and review failure modes</li>
          <li><strong>Week 4:</strong> Draft the pilot blueprint, metrics, and decision rule</li>
        </ul>
      </>
    )
  }
};

export function LearnerTabUI({ data }: { data: LearnerContentData }) {
  const [activeTab, setActiveTab] = useState<keyof LearnerContentData>("overview");

  const tabs: { key: keyof LearnerContentData; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "example", label: "Worked Example" },
    { key: "prompts", label: "Prompt Pack" },
    { key: "practice", label: "Practice" },
    { key: "mistakes", label: "Key Mistakes" }
  ];

  return (
    <div className="learner-tab-panel">
      <div className="learner-tabs-header">
        {tabs.map(tab => data[tab.key] ? (
          <button
            key={tab.key}
            className={`learner-tab-btn ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ) : null)}
      </div>
      <div className="learner-tab-content">
        {data[activeTab] || <p className="muted">Content not available.</p>}
      </div>
    </div>
  );
}
