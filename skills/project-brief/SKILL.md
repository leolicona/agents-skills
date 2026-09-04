---
name: project-brief
description: >-
  Interviews the user with a short series of questions and turns the answers
  into a projectbrief.md that feeds GitHub Spec Kit. Use when the user asks
  to create, start or fill in a project brief or kickoff document, or wants
  the product context before /speckit.constitution and /speckit.specify.
tags: [product, discovery, interview, spec-driven-development]
allowed-tools: [Read, Write, Edit, Glob, Grep]
---

# Project brief

## When to use this skill

The user asks to create, start, complete or update a project brief or kickoff
document. Not for a technical spec or an implementation plan: the brief
answers **what** and **why**, not **how**.

Context: one developer building product with AI agents, and that developer
decides. Never ask about stakeholders, approvals or sign-off.

## How to work

1. Read what exists first: `README`, the constitution
   (`memory/constitution.md` or `.specify/memory/constitution.md`), any
   `specs/*/spec.md` and any current `projectbrief.md`. Never ask what is
   already written down — confirm it instead.
2. Ask in rounds, **3 questions per turn maximum**, numbered, each with a
   suggested answer when you have a basis for one.
3. Close every round with a one-sentence summary and ask for corrections.
4. Run the synthesis round.
5. Write the brief from `references/projectbrief-template.md`, then report
   the path and what stayed open.

## Rounds 1-4

1. **Identity and problem.** Project name and one-sentence description. What
   problem does it solve, and for whom? What happens today without it?
2. **Goals and boundaries.** Top three success criteria, and how each is
   measured. What is explicitly out of scope? Anything that already exists
   and can be reused?
3. **Appetite, capacity and cost.** How much time is this worth — the budget
   that constrains scope, not an estimate — and is there a real external
   deadline? How many hours a week can you give it, and which parts do you
   expect the agents to carry? What will it cost to run (APIs, tools,
   hosting)?
4. **Premortem.** "It is <appetite> from now, the project is dead. What
   killed it?" — prospective hindsight surfaces concrete risks where "what
   could go wrong" gets bland ones. Then: what does this depend on, and what
   happens if that slips?

Ask rounds 3 and 4 even if the user only wanted the first questions: the
brief has those sections, and empty ones make it useless. When the appetite
and the three success criteria cannot both be true, say so — that is the
trade-off the brief exists to force.

## Round 5 — synthesis (2 iterations maximum)

Read every answer together and ask **only** about what does not add up: a
criterion that contradicts the out-of-scope list, a metric with no data
source today, goals that do not fit the appetite, an audience missing from
the problem statement, or anything still vague ("fast", "scalable",
"better UX").

Play back a two-line draft summary plus the three success criteria for
confirmation. Then stop: after two iterations, whatever is unresolved is
written as a `[NEEDS CLARIFICATION: ...]` marker and you write the brief
anyway. An endless interview delivers nothing.

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
- **Never for the core.** Problem, audience and the three success criteria
  are the user's to state; you may rephrase what they said, not supply it.
  Suggest on scope, timeline, metrics and risks.
- **Silence is not consent.** Accepted only if the user says so; otherwise it
  becomes a `[NEEDS CLARIFICATION: ...]` marker.
- An accepted suggestion goes in *Assumptions and decisions*, marked as
  agent-sourced, so the brief shows what came from whom.

## Output

Write `projectbrief.md` in the project root — or next to the constitution
when the repo has one, so Spec Kit's project-level context lives together.
Follow `references/projectbrief-template.md`.

## Spec-driven development

The brief sits upstream of Spec Kit and feeds it; it never replaces its
artifacts:

| Brief section | Feeds |
| --- | --- |
| Appetite, capacity, run cost | `/speckit.constitution` → the constitution |
| Summary, Problem, Audience, Success criteria, Out of scope | `/speckit.specify` → `specs/###-feature/spec.md` |
| `[NEEDS CLARIFICATION]` markers | `/speckit.clarify` |

- **Do not write what `spec.md` owns**: no user stories, no P1/P2 priorities,
  no functional requirements, no key entities. The brief stops at what and
  why, for the whole product; the spec covers one feature in depth.
- **Never edit `specs/`, the constitution or `.specify/`** — those belong to
  the Spec Kit commands.
- Mark every unknown with the exact marker syntax
  `[NEEDS CLARIFICATION: what is missing - optionA/optionB?]` so
  `/speckit.clarify` and `/speckit.analyze` find them.

## Rules

- **Never invent.** Anything unanswered becomes a `[NEEDS CLARIFICATION]`
  marker, never a confident paragraph.
- **Write the brief in English**, whatever language the interview used.
- **Exactly three success criteria**, measurable and technology-agnostic: an
  outcome, not a feature — "cut signup abandonment from 40% to 20%", not
  "Google login". More than three, ask which three matter.
- **Out of scope must not be empty.** If the user has none, ask what someone
  might wrongly assume is included.
- **Scope bends to the appetite**, never the reverse: if the criteria do not
  fit, cut scope or drop one, and record which in *Assumptions and
  decisions*.
- **One page.** Technical detail belongs in the spec, not here.
- Confirm before writing the file, and show the path.
- If the user cuts the interview short, write the brief with what you have
  and mark the rest. A partial, honest brief is useful; a complete, invented
  one is not.
