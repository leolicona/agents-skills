---
name: project-brief
description: >-
  Interviews the user with a short series of questions and turns the answers
  into a projectbrief.md. Use when the user asks to create, start, or fill in
  a project brief, a project kickoff document, or a brief for a new project.
tags: [product, discovery, interview, documentation]
allowed-tools: [Read, Write, Edit, Glob, Grep]
---

# Project brief

## When to use this skill

The user asks to create, start, complete or update a project brief or kickoff
document. Not for a technical spec or an implementation plan: the brief
answers **what** and **why**, not **how**.

## How to work

1. Read the README, `docs/` and any existing `projectbrief.md` first. Never
   ask what is already written down — confirm it instead.
2. Ask in rounds, **3 questions per turn maximum**, numbered, each with a
   suggested answer when you have a basis for one.
3. Close every round with a one-sentence summary and ask for corrections.
4. Run the synthesis round.
5. Write `projectbrief.md` in the project root (or wherever the repo keeps
   docs), then report the path and what stayed open.

## Rounds 1-3

1. **Identity and problem.** Project name and one-sentence description. What
   problem does it solve, and for whom? What happens today without it?
2. **Goals and boundaries.** Top three goals or success criteria, and how
   each is measured. What is explicitly out of scope? Anything that already
   exists and can be reused?
3. **Timeline and risk.** Deadline and where that date comes from. Risks.
   Dependencies, and what happens if they slip.

Ask round 3 even if the user only wanted the first questions: the brief has
those sections, and empty ones make it useless.

## Round 4 — synthesis (2 iterations maximum)

Read every answer together and ask **only** about what does not add up:

- a goal that contradicts the out-of-scope list;
- a metric with no data source today;
- a deadline the three goals cannot fit into;
- an audience missing from the problem statement, or the reverse;
- anything still vague: "fast", "scalable", "better UX".

Play back a two-line draft summary plus the three goals for confirmation.
Then stop: after two iterations, whatever is unresolved goes to *Open
questions* and you write the brief anyway. An endless interview delivers
nothing.

## Suggested answers

Attach one to a question whenever you can, so the user confirms instead of
drafting:

```text
3. What is explicitly out of scope?
   Suggested: mobile app and SSO — you said the pilot is desktop-only for the
   internal team. Confirm, correct, or say "skip" to leave it open.
```

- **Only with a basis, and cite it** — something the user said, or something
  you read in the repo. No basis, plain question.
- **Never for the core.** Problem, audience and the three goals are the
  user's to state; you may rephrase what they said, not supply it. Suggest on
  scope, timeline, metrics and risks.
- **Silence is not consent.** Accepted only if the user says so; otherwise it
  goes to *Open questions*.
- An accepted suggestion goes in the *Decisions* table, so the brief shows
  what came from the user and what came from you.

## Output: `projectbrief.md`

```markdown
# Project brief: <project name>

Status: draft | reviewed | approved
Date: YYYY-MM-DD
Owner: <name>

## Summary
<One sentence: what this is, for whom, and what it achieves.>

## Problem
<The situation today, who it hurts, what it costs.>

## Audience
<Who uses this, how often, which other groups are affected.>

## Goals and success criteria
| # | Goal | How we measure it | Target |
| --- | --- | --- | --- |

## Out of scope
- <Explicitly not part of this project.>

## Timeline
| Milestone | Target date | What it proves |
| --- | --- | --- |

## Risks and dependencies
| Risk or dependency | Impact | Mitigation or owner |
| --- | --- | --- |

## Open questions
- [ ] <Unanswered question> — owner: <who>

## Decisions
| Date | Decision | Why | Source |
| --- | --- | --- | --- |
```

## Rules

- **Never invent.** Anything unanswered belongs in *Open questions*.
- **Write the brief in English**, whatever language the interview used.
- **Exactly three goals**, and a goal is an outcome, not a feature: "cut
  signup abandonment from 40% to 20%", not "Google login". More than three,
  ask which three matter.
- **Out of scope must not be empty.** If the user has none, ask what someone
  might wrongly assume is included.
- **One page.** Technical detail goes in a separate linked document.
- Confirm before writing the file, and show the path.
- If the user cuts the interview short, write the brief with what you have
  and mark the rest open. A partial, honest brief is useful; a complete,
  invented one is not.
