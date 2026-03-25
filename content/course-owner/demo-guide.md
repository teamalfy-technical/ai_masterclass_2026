# Demo Guide

## Demo 1: Prompt and Context Quality
- Goal: show that context and acceptance criteria improve output quality more than vague prompting
- Duration: 8 to 10 minutes
- Flow:
  - start with a weak request
  - ask for a generic answer
  - improve the task brief with audience, scope, constraints, and output expectations
  - compare the outputs
- Debrief:
  - what changed
  - which extra detail mattered most

## Demo 2: Codex Workflow
- Goal: show a bounded, trustworthy coding-agent workflow
- Duration: 20 to 25 minutes
- Required points:
  - repo understanding
  - plan before change
  - AGENTS.md if available
  - validation after implementation
  - review of the diff and risks
- Acceptance criteria:
  - participants can describe inspect, plan, implement, validate, review, summarize
- Debrief:
  - where should approvals sit
  - what makes the run trustworthy

## Demo 3: OpenClaw Workflow Walkthrough
- Goal: show why orchestration matters beyond plain chat
- Duration: 15 to 18 minutes
- Required points:
  - Gateway as control plane
  - channels, nodes, and session routing
  - native skills and ClawHub-installed skills
  - ACP session concept
  - where Codex can fit as an external runtime
- Acceptance criteria:
  - participants can explain what OpenClaw adds and why it changes operations
- Debrief:
  - what approvals are needed
  - what trust assumptions change in a self-hosted system
