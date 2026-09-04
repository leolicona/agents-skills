# Project brief template

Copy this structure. Keep the whole document to one page. Mark every unknown
with the Spec Kit clarification marker so `/speckit.clarify` and
`/speckit.analyze` can pick it up:

`[NEEDS CLARIFICATION: what is missing - optionA/optionB?]`

---

```markdown
# Project brief: <project name>

Status: draft | reviewed | approved
Date: YYYY-MM-DD

## Summary
<One sentence: what this is, for whom, and what it achieves.>

## Problem
<The situation today, who it hurts, what it costs.>

## Audience
<Who uses this, how often, which other groups are affected.>

## Success criteria
Measurable and technology-agnostic — an outcome, never a feature.

| # | Criterion | How we measure it | Target |
| --- | --- | --- | --- |

## Out of scope
- <Explicitly not part of this project.>

## Appetite, capacity and cost
- **Appetite:** <time this is worth; scope bends to fit it>
- **Capacity:** <developer hours per week, and what the agents carry>
- **Run cost:** <APIs, tools, hosting>

## Timeline
| Milestone | Target date | What it proves |
| --- | --- | --- |

## Risks and dependencies
| Risk or dependency | Impact | Mitigation |
| --- | --- | --- |

## Assumptions and decisions
Reasonable defaults chosen where the answer was missing, and what was
decided when scope had to bend to the appetite.

| Date | Assumption or decision | Why | Source (user / agent) |
| --- | --- | --- | --- |

## Open questions
- [ ] [NEEDS CLARIFICATION: <question> - <optionA>/<optionB>?]

## Next steps
1. `/speckit.constitution` — turn appetite, capacity and run cost into
   project principles and constraints.
2. `/speckit.specify` — feed it Summary, Problem, Audience, Success criteria
   and Out of scope; it writes `specs/###-feature/spec.md`.
```
