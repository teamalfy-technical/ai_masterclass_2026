# Resource Sheet

## Core documentation
- Codex overview: https://developers.openai.com/codex
- Codex best practices: https://developers.openai.com/codex/learn/best-practices
- Codex approvals and security: https://developers.openai.com/codex/agent-approvals-security
- OpenClaw docs home: https://docs.openclaw.ai/
- OpenClaw skills: https://docs.openclaw.ai/tools/skills
- OpenClaw ACP agents: https://docs.openclaw.ai/tools/acp-agents

## What to look for in the Codex docs
- App, IDE, CLI, and web usage surfaces
- AGENTS.md as reusable project guidance
- MCP and connectors for tool and context access
- skills for repeatable workflows
- validation loops with testing and review
- sandboxing, approvals, and network controls

## What to look for in the OpenClaw docs
- Gateway as the source of truth for sessions, routing, and channel connections
- channels, agents, bindings, and routed sessions
- native skills and ClawHub-installed skills
- ACP sessions for external runtimes such as Codex
- approval controls, permissions, and security posture

## Suggested setup for the course team
- A safe demo repository for Codex
- A prepared Codex environment with approvals and validation steps pretested
- A prepared OpenClaw walkthrough environment or architecture screenshots
- Backup screenshots or recordings for each demo

## Suggested participant access
- No required accounts for a demo-led cohort
- Optional shared repo or screenshots for follow-up review

## Useful artifacts to prepare
- Sample AGENTS.md
- Sample skill folder with SKILL.md
- One Codex task brief with acceptance criteria
- One OpenClaw architecture diagram
- One approval and governance checklist

## Glossary
- AGENTS.md: a repository or directory-level guidance file that tells Codex how to work in that context
- MCP: a protocol and tooling layer for structured tool and context access
- skill: a reusable package of instructions or workflow guidance
- sandbox: a restriction layer that limits what an agent can do locally
- approval policy: the rule set defining when human confirmation is required
- Gateway: OpenClaw's central routing and session authority
- ACP session: a managed session used to connect external agent runtimes

## Post-course learning path
- First: review the course guide and your completed pilot blueprint
- Second: revisit the Codex best practices and approval model
- Third: review the OpenClaw architecture, skills, and ACP documentation
- Fourth: identify one pilot and validate the controls before implementation
