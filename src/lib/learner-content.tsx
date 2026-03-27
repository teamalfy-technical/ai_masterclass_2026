import React, { useState } from "react";

export type LearnerContentData = {
  overview?: React.ReactNode;
  example?: React.ReactNode;
  prompts?: React.ReactNode;
  practice?: React.ReactNode;
  mistakes?: React.ReactNode;
};

export const learnerContentMap: Record<string, LearnerContentData> = {
  "ai-fundamentals-and-the-llm-shift": {
    overview: (
      <>
        <p>This chapter gives you the foundation. Before you learn to prompt effectively, use Codex, or design AI workflows, you need to understand what AI actually is, how large language models work, and why they behave the way they do.</p>
        <p><strong>Key concepts covered:</strong></p>
        <ul className="signal-list" style={{ marginTop: '1rem' }}>
          <li><strong>AI is an umbrella term.</strong> Many very different technologies get called AI — understanding the landscape prevents confusion.</li>
          <li><strong>LLMs are prediction engines.</strong> A large language model predicts the most likely next token given a sequence of input tokens. It does not understand, reason, or know things the way a human does.</li>
          <li><strong>Fluency is not understanding.</strong> A model can produce eloquent, confident, well-structured text and still be wrong.</li>
          <li><strong>Hallucinations are structural.</strong> LLMs generate plausible-sounding content that is sometimes factually incorrect because they optimise for likelihood, not truth.</li>
          <li><strong>Systems beat single prompts.</strong> Reliable AI depends on workflows that combine the model with context, tools, retrieval, validation, and human review.</li>
        </ul>
      </>
    ),
    example: (
      <>
        <p>Imagine you ask an AI assistant: <em>"What year did Acme Corp merge with GlobalTech?"</em></p>
        <p>A <strong>plain LLM</strong> might give a confident answer — say, "2019" — even if the merger never happened. It generates text that sounds plausible based on patterns in its training data.</p>
        <p>A <strong>system-level approach</strong> would:</p>
        <ul>
          <li>search a verified corporate database for the actual record</li>
          <li>return the answer only if a source is found</li>
          <li>say "I could not find this information" if no record exists</li>
          <li>cite the source so a human can verify</li>
        </ul>
        <p>The difference is not intelligence. It is <strong>grounding</strong> — connecting the model to reality instead of relying on prediction alone.</p>
        <p>This is why later chapters on context engineering, RAG, Codex, and OpenClaw matter: they show you how to build the system around the model.</p>
      </>
    ),
    prompts: (
      <>
        <p className="eyebrow">Explore what the model knows and does not know</p>
        <pre className="prompt-block"><code>{`Explain the difference between machine learning,
deep learning, generative AI, and a large language model.
Use plain language suitable for a business audience.
Give one practical example for each.
Keep the total explanation under 300 words.`}</code></pre>
        <p className="eyebrow" style={{marginTop:'1.5rem'}}>Test the model's limits</p>
        <pre className="prompt-block"><code>{`I am going to ask you a factual question. Before answering:
1. State your confidence level (high, medium, low)
2. Explain what you are basing your answer on
3. Say clearly if you are uncertain or guessing
4. If you do not know, say so

Question: [insert a question about something recent,
niche, or organisation-specific]`}</code></pre>
        <p className="eyebrow" style={{marginTop:'1.5rem'}}>Map a task as a system, not a prompt</p>
        <pre className="prompt-block"><code>{`Help me map this work task into an AI system.

Task: [describe the task]
Inputs: [what information comes in]
Desired output: [what a good result looks like]

Return:
1. what the model should do
2. what must come from data or retrieval
3. where human review should happen
4. what tools or actions are needed
5. what could go wrong
6. the smallest useful pilot scope`}</code></pre>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>Assuming the model has up-to-date knowledge — it does not; training data has a cutoff</li>
          <li>Trusting confident-sounding answers without verification</li>
          <li>Treating the model as a reasoning engine instead of a pattern-completion engine</li>
          <li>Expecting consistency — the same question may produce different answers</li>
          <li>Skipping the "what is actually doing the work?" question when evaluating AI demos</li>
          <li>Conflating impressive output with reliable workflow</li>
        </ul>
      </>
    ),
    practice: (
      <>
        <p><strong>Exercise 1:</strong> Pick a factual question from your work domain (something specific and verifiable). Ask the model. Then verify its answer independently. Note where it was right, where it was wrong, and where it was confident despite being wrong.</p>
        <p><strong>Exercise 2:</strong> Take one recurring task from your team. Break it into:</p>
        <ul>
          <li>what requires reasoning</li>
          <li>what requires retrieval from real data</li>
          <li>what requires action (sending, updating, logging)</li>
          <li>what needs human approval</li>
        </ul>
        <p>That is your first systems map — and it connects directly to the rest of the course.</p>
      </>
    )
  },
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
        <p><strong>Codex</strong> is an AI coding agent that runs inside a sandboxed cloud environment. It reads your repository, proposes a plan, writes code, runs tests, and returns a diff for human review.</p>
        <p>This chapter covers the full Codex workflow: what it is, how to set it up, how to operate it daily, how to configure it for your team, how to validate output, and how to govern it safely.</p>
        <p><strong>The key mental model:</strong></p>
        <ul className="signal-list" style={{ marginTop: '1rem' }}>
          <li><strong>Codex is not autocomplete</strong> — it is an agent that works inside your repo and returns reviewable results</li>
          <li><strong>The core operating loop:</strong> plan → implement → run checks → review diff → approve or revise</li>
          <li><strong>Configuration makes it repeatable:</strong> AGENTS.md for repo guidance, MCP for external context, skills for reusable workflows</li>
          <li><strong>Validation makes it safe:</strong> tests, linting, builds, diff review, and acceptance criteria</li>
          <li><strong>Governance makes it approved:</strong> sandboxing, writable roots, network controls, and human review</li>
        </ul>
        <p>Codex is available via the ChatGPT app, VS Code / IDE integration, and CLI — each suited to different workflows.</p>
      </>
    ),
    example: (
      <>
        <p><strong>The everyday Codex operating loop in practice:</strong></p>
        <p>Suppose you need to add input validation to an existing API endpoint.</p>
        <p><strong>Step 1: Ask for a plan</strong></p>
        <pre className="prompt-block"><code>{`/plan Add input validation to the /api/users endpoint.
Validate: name (required, string, max 100 chars),
email (required, valid format), role (optional, must be
"admin" or "member"). Return clear error messages.`}</code></pre>
        <p><strong>Step 2: Review the plan before implementation</strong></p>
        <p>Codex returns a plan listing the files it intends to change, the validation approach, and the test cases it will write. You approve or revise.</p>
        <p><strong>Step 3: Monitor progress and review the diff</strong></p>
        <pre className="prompt-block"><code>{`/status    — check what Codex is doing
/diff      — inspect the actual changes line by line
/review    — ask Codex to self-assess its own work`}</code></pre>
        <p><strong>Step 4: Run checks and approve</strong></p>
        <p>Tests pass, lint passes, diff looks correct. You approve the changes as a pull request.</p>
      </>
    ),
    prompts: (
      <>
        <p className="eyebrow">Ask Codex to explain before editing</p>
        <pre className="prompt-block"><code>{`Explain the structure of this codebase. List the main
directories, entry points, and how data flows through
the application. Do not make any changes yet.`}</code></pre>
        <p className="eyebrow" style={{marginTop:'1.5rem'}}>Plan-first task brief</p>
        <pre className="prompt-block"><code>{`/plan [describe the bounded task]

Requirements:
- [specific requirement 1]
- [specific requirement 2]
- [constraint or restriction]

Acceptance criteria:
- [what a correct result looks like]
- [edge cases to handle]`}</code></pre>
        <p className="eyebrow" style={{marginTop:'1.5rem'}}>Key slash commands</p>
        <pre className="prompt-block"><code>{`/plan         — ask Codex to propose before changing
/status       — check progress on the current task
/diff         — inspect the changes made so far
/review       — request a self-assessment
/model        — select the model tier
/permissions  — restrict file and network access`}</code></pre>
        <p className="eyebrow" style={{marginTop:'1.5rem'}}>AGENTS.md — durable repo guidance</p>
        <pre className="prompt-block"><code>{`# AGENTS.md (place in repo root)
- Follow the existing code style and naming conventions
- Always write tests for new functions
- Do not modify infrastructure or deployment files
- Use TypeScript strict mode
- Prefer small, focused commits`}</code></pre>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>Skipping the plan step and letting Codex start changing files immediately</li>
          <li>Accepting code because tests pass, without reviewing the diff</li>
          <li>Giving Codex overly broad tasks instead of bounded, specific ones</li>
          <li>Forgetting to set AGENTS.md — every task starts from zero without it</li>
          <li>Granting full network access when the task does not require it</li>
          <li>Treating Codex output as finished code instead of a pull request to review</li>
          <li>Skipping validation on edge cases — AI handles the happy path well but often misses boundaries</li>
        </ul>
      </>
    ),
    practice: (
      <>
        <p><strong>Guided exercise: Run the Codex operating loop once</strong></p>
        <ol>
          <li>Connect Codex to a sample or personal repo</li>
          <li>Ask Codex to explain the codebase structure (read-only first task)</li>
          <li>Assign a bounded task: add input validation to one endpoint or function</li>
          <li>Use <code>/plan</code> to review the approach before implementation</li>
          <li>Use <code>/status</code> and <code>/diff</code> to monitor and inspect</li>
          <li>Run tests, lint, and type checks</li>
          <li>Review the diff line by line</li>
          <li>Approve or request revisions</li>
        </ol>
        <p><strong>Success criteria:</strong> build passes, tests pass, diff is reviewed, and the change is correct.</p>
        <p><strong>Take-home:</strong> repeat this exercise with one real task from your own codebase within the next 7 days.</p>
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
        <p>Day 2 moves from models to systems. <strong>OpenClaw</strong> is the concrete example of that shift — a self-hosted, multi-channel AI assistant with persistence, routing, tools, skills, and governance built in.</p>
        <p><strong>Key architecture concepts:</strong></p>
        <ul className="signal-list" style={{ marginTop: '1rem' }}>
          <li><strong>Gateway</strong> — the control plane and single source of truth. All messages, sessions, and routing flow through it.</li>
          <li><strong>Sessions</strong> — persistent conversations that survive across messages, channels, and time.</li>
          <li><strong>Tools</strong> — actions the model can call: search, calculate, query APIs, run code.</li>
          <li><strong>Skills</strong> — markdown guidance files (SKILL.md) that teach the agent when and how to use tools.</li>
          <li><strong>Plugins</strong> — packaged bundles of channels, providers, tools, and skills for easy installation.</li>
          <li><strong>Dashboard</strong> — the operator surface for monitoring, configuration, and session management.</li>
        </ul>
        <p style={{ marginTop: '1rem' }}><strong>Why OpenClaw instead of plain chat?</strong> Plain chat is stateless, single-channel, and uncontrolled. OpenClaw adds persistence, routing, multi-channel continuity, tool access, skill guidance, security boundaries, and operator control.</p>
      </>
    ),
    example: (
      <>
        <p><strong>Scenario:</strong> Your team wants an internal support assistant that can answer policy questions, check leave balances, and route complex queries to HR.</p>
        <p>With <strong>plain chat</strong>, each conversation starts from scratch. The assistant has no memory, no access to internal systems, and no way to route requests.</p>
        <p>With <strong>OpenClaw</strong>:</p>
        <ul>
          <li>The Gateway maintains persistent sessions — the assistant remembers prior context</li>
          <li>A <em>policy-lookup</em> skill retrieves answers from your HR knowledge base (RAG)</li>
          <li>A <em>leave-balance</em> tool queries the HR system via API</li>
          <li>Routing rules send complex requests to a human HR review queue</li>
          <li>Users interact via Slack, Teams, or the web dashboard — same session, same context</li>
          <li>Token auth and pairing ensure only authorised team members can access it</li>
          <li>The operator dashboard shows session logs, tool calls, and routing decisions</li>
        </ul>
        <p>That is the difference between a chat interface and a governed AI system.</p>
      </>
    ),
    prompts: (
      <>
        <p className="eyebrow">Map a workflow for OpenClaw</p>
        <pre className="prompt-block"><code>{`I want to design an AI assistant workflow using OpenClaw.

Workflow: [describe the recurring workflow]
Users: [who interacts with this assistant]
Channels: [where users already work — Slack, Teams, web, CLI]

Return:
1. What triggers a session
2. What context the assistant needs (retrieval, API, memory)
3. Which tools it should call
4. Which skills would guide its behaviour
5. Where human review should happen
6. What security controls are needed
7. How you would measure success`}</code></pre>
        <p className="eyebrow" style={{marginTop:'1.5rem'}}>Evaluate OpenClaw fit</p>
        <pre className="prompt-block"><code>{`I am considering whether OpenClaw is the right tool
for this use case: [describe use case].

Evaluate whether it needs:
- persistence across interactions
- multi-channel access
- tool integration
- deterministic routing
- operator control and audit logging
- security boundaries

If most answers are "yes," OpenClaw is a good fit.
If most are "no," a simpler solution may be enough.`}</code></pre>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>Treating OpenClaw as "just another chat UI" — it is an orchestration layer, not an interface</li>
          <li>Skipping the onboarding wizard and trying to configure everything manually</li>
          <li>Exposing the Gateway to the network before configuring authentication</li>
          <li>Giving tools broad permissions without defining skill constraints</li>
          <li>Forgetting that sessions persist — sensitive data may carry over between interactions</li>
          <li>Not reviewing the operator dashboard logs to understand what the assistant actually did</li>
          <li>Assuming the assistant is deterministic without checking routing rules</li>
        </ul>
      </>
    ),
    practice: (
      <>
        <p><strong>Exercise 1 — First-Run Walkthrough:</strong> If you have OpenClaw installed, complete the setup flow: install → onboard → verify Gateway → open dashboard → send first message. Note what you found easy and what was confusing.</p>
        <p><strong>Exercise 2 — Workflow Mapping:</strong> Choose one recurring workflow from your team. Map it into:</p>
        <ul>
          <li>Trigger (what starts the workflow)</li>
          <li>Context (what information is needed)</li>
          <li>Tools (what actions the assistant takes)</li>
          <li>Skills (what guidance the assistant follows)</li>
          <li>Routing (when does a human review)</li>
          <li>Security (who can access, what data flows)</li>
        </ul>
        <p>This workflow map becomes the starting point for your capstone pilot blueprint.</p>
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
