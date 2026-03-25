# Exercise Workbook

## How to use this workbook
- Complete each activity during the relevant module.
- Keep answers short and operational.
- Every exercise should help the final pilot blueprint.

## Completion standard
A participant has completed the workbook when they have:
- classified at least one AI use case correctly
- diagnosed at least one failure mode
- rewritten at least one weak task brief
- mapped at least one approval/control path
- completed one system map
- produced one capstone pilot blueprint

## Activity 1: Use-Case Sorting
- Module: The AI Map
- Time: 12 minutes
- Format: small groups
- Prompt:
  - Sort six example scenarios into chatbot, retrieval workflow, automation, or agentic workflow.
- Expected output:
  - One sorted list with a short reason for each choice.
- Success criteria:
  - The team can explain why a scenario needs or does not need orchestration, retrieval, or tool use.
- Debrief questions:
  - Which use cases were easy to classify?
  - Which ones looked similar at first but were operationally different?

## Activity 2: Failure Diagnosis
- Module: How Modern AI Works
- Time: 10 minutes
- Format: pairs
- Prompt:
  - Review one flawed AI output and identify whether the failure came from poor context, weak prompting, missing retrieval, unsafe autonomy, or weak human review.
- Expected output:
  - One diagnosis and one corrective action.
- Success criteria:
  - The pair can point to the system component that most likely caused the failure.
- Debrief questions:
  - Was this primarily a model issue or a workflow design issue?
  - What would you change first?

## Activity 3: Prompt Repair
- Module: Prompting and Context Engineering
- Time: 15 minutes
- Format: individual then pair review
- Prompt:
  - Rewrite a vague request into a task brief with context, constraints, acceptance criteria, and required verification.
- Expected output:
  - Three improved task briefs.
- Success criteria:
  - Each prompt includes audience, scope, output type, and a definition of done.
- Debrief questions:
  - What changed most from the original version?
  - Which details were essential rather than nice-to-have?

## Activity 4: Control-Point Review
- Module: Codex Deep Dive
- Time: 12 minutes
- Format: table discussion
- Prompt:
  - Identify where approvals, sandboxing, and review gates should sit in an AI-assisted coding workflow.
- Expected output:
  - A high-trust, medium-trust, low-trust map.
- Success criteria:
  - The group can distinguish safe read-only use from riskier execution and networked actions.
- Debrief questions:
  - What should always need human approval?
  - What could be safely delegated under policy?

## Activity 5: Demo Review Rubric
- Module: Codex End-to-End Demo or Codex Practical Lab
- Time: 15 minutes
- Format: small groups
- Prompt:
  - Score the Codex run on task clarity, validation, diff reviewability, risk posture, and rollout readiness.
- Scoring scale:
  - 1 = weak
  - 2 = mixed
  - 3 = strong
- Expected output:
  - A go, no-go, or pilot recommendation.
- Success criteria:
  - The group can justify the recommendation using observable workflow evidence.
- Debrief questions:
  - What made the run trustworthy or untrustworthy?
  - What would you require before wider use?

## Activity 6: System Mapping
- Module: Building Real AI Systems
- Time: 15 minutes
- Format: group exercise
- Prompt:
  - Map one internal workflow using these fields: user, trigger, model, context source, tools, approvals, outputs, metrics.
- Expected output:
  - One system map for a candidate use case.
- Success criteria:
  - The group can describe where human oversight enters the system.
- Debrief questions:
  - What part of the system is least defined right now?
  - Which dependency makes the workflow viable or risky?

## Activity 7: Ownership Map
- Module: OpenClaw Architecture and Setup
- Time: 10 minutes
- Format: group discussion
- Prompt:
  - Identify which teams would own platform operations, workflow design, security review, and adoption.
- Expected output:
  - A draft ownership map or light RACI.
- Success criteria:
  - Platform, business, and control responsibilities are not collapsed into one owner.
- Debrief questions:
  - Who would approve rollout?
  - Who would operate the system day to day?

## Activity 8: Guardrail Design Review
- Module: Skills, ClawHub, and Codex inside OpenClaw
- Time: 10 minutes
- Format: table discussion
- Prompt:
  - List the minimum controls required before connecting a coding agent to a routed assistant platform.
- Expected output:
  - A shortlist of non-negotiable controls.
- Success criteria:
  - The shortlist covers permissions, approvals, data handling, and monitoring.
- Debrief questions:
  - Which control reduces risk the most?
  - Which control is easiest to forget?

## Activity 9: Pilot Blueprint
- Module: Capstone Workflow Workshop
- Time: 25 minutes
- Format: team capstone
- Prompt:
  - Complete the pilot blueprint for one AI-assisted workflow your organization could test in 30 to 90 days.
- Expected output:
  - One completed pilot blueprint.
- Success criteria:
  - The blueprint names a sponsor, a workflow, controls, metrics, and a go/no-go threshold.
- Debrief questions:
  - Why this pilot and not another one?
  - What would make you stop the pilot early?
