# mvp-stack.md template

One page plus tables. Every price or limit carries a source URL and the date
it was checked; anything unverified becomes a marker:
`[NEEDS CLARIFICATION: what is missing - optionA/optionB?]`

---

```markdown
# MVP stack: <project name>

Date: YYYY-MM-DD
Brief: <link to projectbrief.md>
Appetite: <from the brief>    Run-cost ceiling: <from the brief>

## Developer stack
- **Runs today:** <platforms and services already in production>
- **Willing to learn:** <what fits inside the appetite>
- **Will not operate:** <ruled out on purpose>

## Capabilities and decisions
Decision is one of: **adopt** (managed service), **reuse** (library),
**build**. Only the differentiator is built.

| Capability | Decision | Choice | Why | Cost at MVP | Limit to watch |
| --- | --- | --- | --- | --- | --- |

## Rejected alternatives
| Option | Considered for | Why not |
| --- | --- | --- |

## Spikes
| # | Question | Time box | Pass criterion | Unblocks | Fallback | Result |
| --- | --- | --- | --- | --- | --- | --- |

## Cost
| Item | At MVP scale | At 10x | Source |
| --- | --- | --- | --- |

Total at MVP: <amount> against a ceiling of <amount>.

## New technology introduced
<The single unfamiliar tool this MVP takes on, and why it is worth it.>

## Open questions
- [ ] [NEEDS CLARIFICATION: <question> - <optionA>/<optionB>?]

## Next step
`/speckit.plan` — hand it the capability decisions as Technical Context
(language, dependencies, storage, platform, constraints, scale).
```
