# Spike record template

One file per spike, at `spikes/<NNN>-<slug>.md`. Numbers are sequential and
never reused, so a dead end stays findable.

---

```markdown
# Spike NNN: <question in one line>

Date: YYYY-MM-DD    Time box: <hours>    Actual: <hours>
Status: pass | fail | inconclusive
Unblocks: <the decision this was run for>

## Question
<One falsifiable question.>

## Pass criterion
<What would have to be true, in numbers, to call it a pass.>

## Fallback
<What we do if it fails. Decided before running, not after.>

## Setup
<Stack, versions, account tier, data used. Enough to re-run it in six months.>

## What was run
<Commands, endpoints, payload sizes, load. Link the throwaway code.>

## Raw output
```text
<Measurements, pasted, not summarized.>
```

## Verdicts
| Verdict | Result | Evidence |
| --- | --- | --- |
| Works | yes / no | <numbers> |
| Affordable | yes / no | <cost at MVP and 10x vs the ceiling> |
| Maintainable | yes / no | <what operating it demands of this developer> |

## Recommendation
<What to do, and what was learned that the question did not ask about.>

## Cost of this spike
<Money, quota and hours spent. Resources created and torn down.>

## Open questions
- [ ] [NEEDS CLARIFICATION: <question> - <optionA>/<optionB>?]
```
