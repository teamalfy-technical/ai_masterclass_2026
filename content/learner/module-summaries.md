# Module Summaries

## 1. Welcome and Framing
- Time: 15 minutes
- Objective: align the room on what this course covers and what it does not cover
- Key teaching points:
  - this is a practical AI operating course, not a research survey
  - the focus is workflow value, governance, and pilot design
- Exercise: signal scan
- Common misconception:
  - AI strategy starts with model selection
- Takeaway:
  - frame AI as an operating decision, not a hype cycle

## 2. The AI Map
- Time: 45 minutes
- Objective: create a shared map of AI, ML, GenAI, agents, multimodal systems, and automation
- Key teaching points:
  - not every AI use case needs an agent
  - retrieval and orchestration solve different problems
- Demo:
  - chatbot versus workflow-enabled assistant
- Exercise:
  - use-case sorting
- Common misconception:
  - all AI tools are basically the same
- Takeaway:
  - match the use case to the right system type

## 3. How Modern AI Works
- Time: 45 minutes
- Objective: explain models, tokens, context, retrieval, tools, memory, and evaluation in plain language
- Key teaching points:
  - context quality matters more than prompt cleverness
  - failures usually point to a system design issue, not just a model issue
- Exercise:
  - failure diagnosis
- Common misconception:
  - hallucination is random and unavoidable
- Takeaway:
  - AI becomes manageable when you can name the system components and failure modes

## 4. Prompting and Context Engineering
- Time: 45 minutes
- Objective: teach participants to write task briefs that are bounded and reviewable
- Key teaching points:
  - good prompts define scope, output, and verification
  - repeatable guidance matters more than one-off cleverness
- Demo:
  - weak ask to operational brief
- Exercise:
  - prompt repair
- Common misconception:
  - prompting is mainly about magic phrases
- Takeaway:
  - strong context design improves reliability

## 5. Codex Deep Dive
- Time: 45 minutes
- Objective: explain how Codex works across app, CLI, IDE, and cloud-style workflows
- Key teaching points:
  - AGENTS.md stores durable repo guidance
  - MCP expands tool and context access
  - skills support reusable task patterns
  - safe use depends on approvals, sandboxing, and validation
- Exercise:
  - control-point review
- Common misconception:
  - Codex is just a chat interface for code
- Takeaway:
  - Codex is most useful as a governed workflow, not a novelty assistant

## 6. Codex End-to-End Demo
- Time: 30 minutes
- Objective: show the complete flow from repo understanding to validation and summary
- Key teaching points:
  - define the task clearly
  - ask for a plan
  - run checks
  - review the diff
  - summarize risks and next steps
- Exercise:
  - demo review rubric
- Common misconception:
  - trust comes from output speed rather than validation
- Takeaway:
  - trustworthy AI work is observable and reviewable

## 7. Recap and Reflection
- Time: 15 minutes
- Objective: reinforce learning from Day 1 and surface remaining barriers
- Key teaching points:
  - value and risk must be discussed together
  - unresolved questions should shape the Day 2 discussion
- Exercise:
  - risk and opportunity pairing
- Common misconception:
  - uncertainty means the organization is not ready
- Takeaway:
  - disciplined questions are part of readiness

## 8. Building Real AI Systems
- Time: 45 minutes
- Objective: move from chatbot thinking to workflow and system design
- Key teaching points:
  - RAG is not the same thing as orchestration
  - tools, memory, routing, and approvals create operational systems
- Exercise:
  - system mapping
- Common misconception:
  - adding retrieval makes a system production-ready
- Takeaway:
  - real value comes from system design, not model access alone

## 9. Codex Practical Lab
- Time: 45 minutes
- Objective: inspect a Codex-assisted task with an executive review lens
- Key teaching points:
  - bounded tasks are the right starting point
  - leaders can judge clarity, controls, and reviewability without coding
- Exercise:
  - executive review rubric
- Common misconception:
  - non-coders cannot evaluate AI-assisted software work
- Takeaway:
  - operational review is a leadership skill

## 10. OpenClaw Architecture and Setup
- Time: 45 minutes
- Objective: explain OpenClaw as a self-hosted orchestration layer
- Key teaching points:
  - the Gateway is the source of truth for sessions, routing, and channel connections
  - multi-channel assistants require clear control boundaries
  - self-hosting changes the trust and governance conversation
- Exercise:
  - ownership map
- Common misconception:
  - orchestration is just a nicer chat interface
- Takeaway:
  - OpenClaw turns isolated AI interactions into managed workflows

## 11. Skills, ClawHub, and Codex inside OpenClaw
- Time: 45 minutes
- Objective: explain how reusable skills and ACP sessions extend OpenClaw
- Key teaching points:
  - native skills and ClawHub-installed skills package repeatable workflows
  - ACP sessions can connect external runtimes such as Codex
  - controls still matter when capability expands
- Exercise:
  - guardrail design review
- Common misconception:
  - more connected agents automatically mean more value
- Takeaway:
  - leverage only matters when governance keeps pace

## 12. Capstone Workflow Workshop
- Time: 30 minutes
- Objective: convert course learning into one pilot blueprint
- Key teaching points:
  - the best pilot is specific, measurable, and governable
  - define users, context, approvals, metrics, and containment before scale
- Exercise:
  - pilot blueprint
- Common misconception:
  - the best pilot is the largest or most ambitious use case
- Takeaway:
  - start with a pilot small enough to control and meaningful enough to matter
