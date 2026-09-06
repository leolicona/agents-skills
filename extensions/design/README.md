# Design Foundations — Spec Kit extension

Defines a frontend project's visual foundations once, before the first
feature with a screen: detects existing tokens and components, interviews the
developer for the visual decisions, and drafts the constitution principles
plus the `design-foundations` feature description.

## Install

Local (development):

```bash
specify extension add --dev /path/to/agents-skills/extensions/design
```

Then, in the agent:

```text
/speckit-design-foundations
/speckit-design-foundations check     # detection only
```

The `after_constitution` hook offers to run it right after
`/speckit-constitution`, which is where it belongs in the flow.

## Output

`.specify/design/foundations.md`, with paste-ready blocks for
`/speckit-constitution`, `/speckit-specify` and `/speckit-plan`. The command
never edits the constitution or `specs/` itself.

Source of truth for this content lives in this repository; the same
material is intended to ship as the `design-foundations` skill for agents
without Spec Kit.
