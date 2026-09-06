# feasibility.md template

One page plus the tables. Every limit and price carries a source URL and the
date checked; anything unsettled becomes
`[NEEDS CLARIFICATION: what is missing - optionA/optionB?]`.

---

```markdown
# Technical feasibility: <project name>

Date: YYYY-MM-DD
Brief: <link to projectbrief.md>
Appetite: <from the brief>    Run-cost ceiling: <from the brief>

## Hypothesis
<The approach the developer intends, in one line.>

## Stack in play
- **Boring here:** <already in production, failure modes known>
- **New here:** <the innovation budget being spent, and on what>
- **Ruled out to operate:** <what the developer will not run>

## Load scenario
<What triggers the peak, how often, under what conditions, and the number
that separates acceptable from not — from question 5 of the interview.>

## Assumptions
| # | Assumption | State | Evidence (URL + date) | Spike |
| --- | --- | --- | --- | --- |
|  |  | refuted / confirmed on paper / unresolved |  | `spikes/NNN-...` |

## Capabilities
Adopt what exists; build only the differentiator.

| Capability (vendor-neutral) | Decision | Choice | Why | Cost at MVP | Limit to watch |
| --- | --- | --- | --- | --- | --- |
|  | adopt / reuse / build |  |  |  |  |

## Rejected alternatives
| Option | Considered for | Why not |
| --- | --- | --- |

## Cost
| Item | At MVP scale | At 10x | Source |
| --- | --- | --- | --- |

Total at MVP: <amount> against a ceiling of <amount>.

## Verdict
**Works / Affordable / Maintainable**, one line each with its evidence, plus
the residual risk that was accepted rather than measured.

## Open questions
- [ ] [NEEDS CLARIFICATION: <question> - <optionA>/<optionB>?]

## Next step
`/speckit-plan` — hand it the capability decisions, limits and scenario as
Technical Context.
```
