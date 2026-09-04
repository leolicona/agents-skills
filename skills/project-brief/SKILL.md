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

- "Write me a project brief", "let's kick off project X", "I need a brief
  for this", "start a projectbrief".
- A `projectbrief.md` already exists and needs to be completed or updated.

Do not use it for a technical spec or an implementation plan: the brief
answers **what** and **why**, not **how**.

## How to work

1. **Read before you ask.** Check the README, `docs/`, open issues and any
   existing `projectbrief.md`. Never spend a question on something already
   written down — confirm it instead: "the README says the stack is X, still
   true?"
2. **Ask in rounds, at most 3 questions per turn**, numbered and in plain
   language. Never dump the whole questionnaire at once.
3. **Reflect and confirm.** Close each round with a one- or two-sentence
   summary of what you understood and ask for corrections.
4. **Push back on vague answers.** "Fast", "scalable", "better UX" are not
   answers: ask for a number, a date, or a concrete example.
5. **Record the gaps.** If the answer is "I don't know" or "we'll see", it
   goes to *Open questions* verbatim. Never invent a plausible answer.
6. **Write `projectbrief.md`** using the template below.
7. **Report** the file path and list what is still open.

## The interview

### Round 1 — identity and problem

1. What is the project name, and how would you describe it in one sentence?
2. What problem does it solve, and who is it for?
3. What happens today without it — how do people work around the problem?

### Round 2 — goals and boundaries

4. What are the top three goals or success criteria? How will you know each
   one was met?
5. What is explicitly out of scope for this project?
6. Is there anything that already exists and can be reused instead of built?

### Round 3 — timeline, risks and dependencies

7. What is the deadline, and where does that date come from? Any milestones
   in between?
8. What could sink this project — the risks you already worry about?
9. What or whom does this depend on (teams, vendors, APIs, approvals), and
   what happens if that slips?

Ask round 3 even if the user only wanted the first questions: the brief has
sections for timeline, risks and dependencies, and empty sections there are
what make a brief useless.

## Output: `projectbrief.md`

Write it to `projectbrief.md` in the project root, unless the repository
keeps documents elsewhere (`docs/`) — then follow that convention and say
where you put it.

```markdown
# Project brief: <project name>

Status: draft | reviewed | approved
Date: YYYY-MM-DD
Owner: <name>

## Summary
<One sentence: what this is, for whom, and what it achieves.>

## Problem
<The situation today, who it hurts, and what it costs.>

## Audience
<Who uses this, how often, and which other groups are affected.>

## Goals and success criteria
| # | Goal | How we measure it | Target |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

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
| Date | Decision | Why | Alternative rejected |
| --- | --- | --- | --- |
```

## Rules

- **Never invent content.** Anything the user did not say belongs in *Open
  questions*, not in a confident paragraph.
- **Write the brief in English**, even when the interview happened in
  another language. Ask the questions in the language the user is using.
- **At most 3 questions per turn**, and stop once you have what you need: a
  long interview gets abandoned halfway.
- **Exactly three goals.** If the user lists more, ask which three matter
  most and move the rest to a "later" note under *Out of scope*.
- **A goal is an outcome, not a feature.** "Google login" is a means;
  "cut signup abandonment from 40% to 20%" is a goal.
- **Out of scope must not be empty.** If the user has no answer, ask what
  someone might wrongly assume is included, and record that.
- **The brief fits on one page.** Technical detail goes into a separate
  document linked from here.
- **Confirm before writing the file**, and show the path once written.
- If the user cuts the interview short, write the brief with what you have
  and mark the rest as open. A partial, honest brief is useful; a complete,
  invented one is not.

## Example

Chasing a vague answer:

```text
User:  We want the app to be faster.
Agent: So I can measure it: which screen feels slow today, how long does it
       take now, and what would be acceptable? If you don't have the number,
       I'll log it as an open question.
```

A goal written badly and well:

```text
Bad:  Improve the checkout experience.
Good: Cut checkout abandonment from 38% to 25% by June 30, measured with the
      existing analytics funnel (`checkout_started` -> `order_placed`).
```
