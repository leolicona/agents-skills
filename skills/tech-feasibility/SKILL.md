---
name: tech-feasibility
description: >-
  Researches whether a project is technically feasible: takes the approach the
  developer already has in mind, tests its riskiest assumption with a
  time-boxed spike, and rules on works / affordable / maintainable. Use when
  asked if an idea is viable, whether X can be built with Y, to research
  feasibility, or to run a spike or proof of concept.
tags: [feasibility, research, spike, experiment, spec-driven-development]
allowed-tools: [Read, Write, Edit, Glob, Grep, Bash, WebSearch, WebFetch]
---

# Technical feasibility

## When to use this skill

The project rests on a technical bet and documentation cannot settle it: does
this approach hold up at our scale, inside our budget, on the platform we
use.

Where the line falls:

- *Which option should I choose?* → `mvp-stack`, which surveys and decides.
- *Does the approach I already have in mind actually work here?* → this skill.
- *Do users want this?* → neither. Running code cannot validate desire. A
  spike validates the **technical** assumption an idea rests on; say so
  plainly rather than letting a green spike pass as product validation.

Context: one developer building product with AI agents. Their experience and
the project's budget are pass/fail criteria here, not background.

## Start from the developer's hypothesis

The developer rarely arrives empty-handed: "I want to build the bot with
Cloudflare's tools" is already an approach. Ask for it in the first turn — a
spike run without it tests the wrong thing:

1. What are you thinking of building this with, and what draws you to it?
2. Which part of that are you least sure about?
3. What would make you drop the approach?

Then state the hypothesis in one line and name its **riskiest assumption** —
the one that sinks the approach if it is false. That is what you test.
Testing the comfortable assumption yields a green spike and a dead project.

If there is no approach in mind, the question is *which option*, and that
belongs to `mvp-stack` first.

## How to work

1. **Gather the constraints.** Read `projectbrief.md` (appetite, run-cost
   ceiling) and `mvp-stack.md` (the developer's stack, the blocked decision).
   If they do not exist, ask what decision this unblocks, what they already
   run and know, and the ceilings in money and hours.
2. **Write the question before touching code**: one falsifiable question
   aimed at the riskiest assumption, a pass criterion you could show someone,
   the time box, the decision it unblocks, and the fallback if it fails. Show
   all five and get a go.
3. **Build it in the developer's stack.** Proving something works in a
   technology they will never operate proves nothing.
4. **Execute for real** — real API, real payload sizes, real rate limits,
   real cold starts. Measure; never infer. Paste the raw output.
5. **Stop at the time box.** Inconclusive is a legitimate result and the
   fallback applies. Do not extend.
6. **Record and recommend.** The decision stays with the developer.
7. **Clean up**: delete the throwaway code, tear down anything you created,
   and note what the spike itself cost.

## The three verdicts

Every spike answers all three, and **a yes on the first with a no on either
of the others is a no**:

| Verdict | Question |
| --- | --- |
| **Works** | Does it hold under real conditions and documented limits? |
| **Affordable** | What does it cost at MVP scale and at 10x, against the ceiling? |
| **Maintainable** | Can this developer operate and debug it with what they know — and if not, how many hours of the appetite does learning it take? |

The third is the one teams skip and regret. An MVP dies from a stack its one
developer cannot debug at 2am as surely as from a missing feature.

## Before spending anything

Ask for confirmation before you spend money or quota, create cloud resources,
or use real credentials. Prefer sandbox numbers, free tiers and synthetic
data. Never run a spike against production data.

## Rules

- **One question per spike.** A second question is a second spike.
- **2-4 hours, a day at the very most.** It comes out of the appetite.
- **Measure, never infer.** No verdict from documentation alone: docs say
  what is promised, the spike says what happens.
- **Spike code is throwaway.** It lives under `spikes/<id>/`, is never merged
  and is never imported by the product. If it turns out to be worth keeping,
  it gets rewritten during the plan phase.
- **Record failures with the same care as passes.** A recorded dead end saves
  the next month; an unrecorded one gets repeated.
- **Test the assumption that could break the approach**, not the one that
  confirms it. The developer picked this bet; your job is to try to falsify
  it while there is still time to change course.
- **Never decide for the developer.** Deliver verdict plus recommendation.
- Never edit `specs/`, `memory/constitution.md` or `.specify/`.

## Output

Write `spikes/<NNN>-<slug>.md` from `references/spike-template.md`, and add
the result row back to the *Spikes* table in `mvp-stack.md` when it exists.

## Example

Support bot on WhatsApp Cloud API. Hypothesis: *"build it with Cloudflare
Workers, KV and R2, which I already run"*. Riskiest assumption: that a Worker
can satisfy the provider's webhook contract under load.

```text
Question:   Can a Worker verify the request signature and answer the webhook
            inside the provider's timeout at 20 messages/second?
Pass:       p95 response under the documented timeout, zero rejected
            signatures, over a 200-message burst.
Box:        3 hours.        Unblocks: the whole platform choice.
Fallback:   queue-backed handler that acknowledges first, processes after.
Verdicts:   works (p95 measured) / affordable (within free tier at MVP,
            priced at 10x) / maintainable (stack already in production).
```

## Spec-driven development

A spike is Phase 0 research: its verdicts fill the **Technical Context** and
constraints that `/speckit.plan` needs. Hand the file over; let the command
write `plan.md` and `research.md`.
