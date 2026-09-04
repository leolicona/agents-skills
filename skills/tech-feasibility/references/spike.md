# Running a spike

A spike is a time-boxed experiment that answers **one** falsifiable question
whose answer changes a decision. It is not a prototype and not a tutorial.
Read this before running one; record the result with `spike-record.md`.

## 1. Choose the shape of the test

- **One unproven point** → a component probe: the smallest program that
  exercises just that point.
- **Two or more unproven integrations** → a thin end-to-end slice, a walking
  skeleton: a tiny implementation that performs one complete function and
  links the main components together. Feasibility usually dies at the seams,
  not inside a box — a webhook that answers fast in isolation says nothing
  about verify → store → generate → reply inside the provider's window.

A walking skeleton built as a spike is still throwaway. If you mean to keep
and refine it — the tracer-bullet style — it stops being a spike: it is the
first slice of the plan and must meet production standards. Decide which one
you are building **before** you start, never after it works.

## 2. Write the spike card, and get it approved

Five fields, before any code:

```text
Question:  <one falsifiable question, aimed at the riskiest assumption>
Pass:      <what must be true, in numbers, from the interview's scenario>
Box:       <2-4 hours; a day at the very most>
Unblocks:  <the decision that is waiting on this>
Fallback:  <what we do if it fails — decided now, not after>
```

A spike with no fallback is a bet, not an experiment. This is the moment a
badly aimed spike gets corrected, while correcting it is still free.

## 3. Declare what it will spend

Ask for confirmation before spending money or quota, creating cloud
resources, or using real credentials. Prefer sandbox numbers, free tiers and
synthetic data. **Never run against production data.**

## 4. Build it throwaway, in the developer's stack

Code lives under `spikes/<NNN>-<slug>/`, is never merged and is never
imported by the product. If it turns out to be worth keeping, it gets
rewritten during the plan phase.

Proving something works in a technology the developer will never operate
proves nothing. Pin versions and note the account tier: the setup has to be
repeatable in six months.

## 5. Execute for real, and measure

Real API, real payload sizes, real rate limits, real cold starts. Measure;
never infer. Capture the raw output verbatim rather than summarizing it.

## 6. Stop at the time box

No extensions. **Inconclusive is a legitimate result** and the fallback
applies. The box is spent from the project's appetite, not added to it.

## 7. Rule the three verdicts

Every spike answers all three, and **a yes on the first with a no on either
of the others is a no**:

| Verdict | Question |
| --- | --- |
| **Works** | Does it hold under real conditions and documented limits? |
| **Affordable** | What does it cost at MVP scale and at 10x, against the ceiling? |
| **Maintainable** | Can this developer operate and debug it with what they know — and if not, how many hours of the appetite does learning it take? |

The third is the one everyone skips: an MVP dies from a stack its one
developer cannot debug at 2am as surely as from a missing feature.

## 8. Record, feed back, clean up

Write the record from `spike-record.md` — passes and failures with the same
care, because a recorded dead end saves the next month. Update the
assumption's row in `feasibility.md`: it becomes settled, or the fallback
becomes the approach. Then delete the throwaway code, tear down anything you
created, and report what the spike itself cost.
