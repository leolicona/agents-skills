---
name: tech-feasibility
description: >-
  Validates whether a project is technically feasible with what already
  exists: interviews the developer for the approach they have in mind, settles
  what the documentation can settle, and spikes only what reading cannot. Use
  when asked whether an idea is viable, whether X can be built with Y, what
  already solves this, or to run a spike or proof of concept.
tags: [feasibility, research, spike, build-vs-buy, spec-driven-development]
allowed-tools: [Read, Write, Edit, Glob, Grep, Bash, WebSearch, WebFetch]
---

# Technical feasibility

## When to use this skill

The project rests on a technical bet: can this be built with what already
exists, inside the budget, by this developer.

Of the four product risks — value, usability, feasibility, business viability
— this covers **feasibility** and the cost half of **viability**. Value and
usability need users, not code: never let a green verdict pass as product
validation.

Context: one developer building product with AI agents, and that developer
decides. Their experience and the project's budget are pass/fail criteria
here, not background.

## Three stages, cheapest first

Run them in order. The cheapest test that could change the decision always
goes first, and most approaches die or survive before a line of code is
written.

**A. Interview** — what is the bet, and what would break it.
**B. Desk research** — settle everything the documentation can settle.
**C. Spike** — measure only what is left.

## Stage A — interview

Read `projectbrief.md` first for the appetite and the run-cost ceiling, and
the constitution (`.specify/memory/constitution.md`, or `memory/constitution.md` in older setups)
for constraints already decided. Then two rounds, three questions each.

*Round 1 — the bet:*

1. What will you build it with, what draws you to that, and what did you
   consider and drop?
2. Which of those pieces are boring for you — already in production — and
   which are new?
3. What would make you abandon this approach?

*Round 2 — the scenario, which becomes the pass criterion:*

4. Describe the moment of highest stress: what triggers it, how often, and
   under what conditions.
5. What must happen then, and with what number and threshold do we measure
   it?
6. When it fails, what should happen — and do you know how these pieces fail?

Then write the hypothesis in one line, and under it the assumptions it rests
on, ranked by what sinks the approach if false. **Test the riskiest, never
the comfortable one**: a green result on a comfortable assumption is a dead
project with good paperwork.

Risk concentrates in the new pieces — the developer already knows the failure
modes of the boring ones. An MVP affords about one new technology; if
question 2 turns up three, say so now rather than after the spike.

## Stage B — desk research

For each assumption, try to settle it by reading, before touching code. Name
each capability the MVP needs in vendor-neutral terms — "receive and verify
inbound webhooks", not "use Workers" — and ask what already solves it whole
before considering building it.

Check, in this order:

- **Hard limits**: rate limits, payload sizes, timeouts, message windows,
  quotas, regions. These kill designs late; find them first.
- **Price** at MVP scale and at 10x, against the ceiling from the brief.
- **Runtime fit**: does it run where you already deploy? Many SDKs assume
  APIs an edge runtime does not have.
- **Is it alive**: last release, open issues, whether the vendor still sells
  it.
- **Known failure modes**, and the exit cost if it has to be swapped.
- **Compliance**, when the capability touches personal data.

Every assumption leaves this stage in one of three states:

| State | Meaning | What follows |
| --- | --- | --- |
| **Refuted** | the documentation says it cannot work | change the approach now — the cheapest good news you will get |
| **Confirmed on paper** | promised by the vendor, plausible | proceed, with the residual risk written down |
| **Unresolved** | reading cannot answer it | goes to stage C |

**Documentation can kill an approach outright, but never certify one.** It
states what is promised, not what happens under load, cold, with your
payloads. So *confirmed on paper* is not enough for the riskiest assumption:
that one still gets measured.

Rules for this stage:

- Verify against the vendor's own documentation, never from memory. A blog
  post is a lead, not evidence.
- Record the URL and the date checked for every limit and price. An
  unverified number is an open question, not a fact.
- Record every rejected alternative in one line. Half the value of this stage
  is what you ruled out, and it is where the fallback comes from.
- Default to adopting what exists. Build only the differentiator — the part
  that makes the product yours.

## Stage C — spike

Only for **unresolved** assumptions, and only after stage B: never spike what
you did not first try to settle by reading.

Read `references/spike.md` before running one. It covers the shape of the
test, the spike card you get approved before writing code, the spending gate,
the time box, the three verdicts and the cleanup.

If stage B leaves nothing unresolved, there is no spike: declare it feasible
on paper and name the residual risk.

## Output

Write `feasibility.md` from `references/feasibility-template.md`, and one
record per experiment under `spikes/`. Report the path, the verdict and what
stayed open.

## Rules

- **Never invent.** Anything unsettled becomes
  `[NEEDS CLARIFICATION: what is missing - optionA/optionB?]`.
- **Never decide for the developer.** Deliver findings, verdict and a
  recommendation; the decision is theirs.
- **Stay inside the appetite.** Research and spikes are spent from it, not
  added to it.
- **One page plus the tables.** Depth goes into the spike records.
- Never edit `specs/`, the constitution or `.specify/`.

## Spec-driven development

This is Phase 0 research: the verdicts and limits fill the **Technical
Context** that `/speckit-plan` needs (language, dependencies, storage,
platform, constraints, scale). Hand `feasibility.md` over and let the command
write `plan.md` and `research.md`.
