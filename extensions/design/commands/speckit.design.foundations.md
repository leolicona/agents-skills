---
description: "Detect existing tokens, interview for visual decisions, and draft the constitution principles plus the design-foundations feature"
---

# Design Foundations

Define the visual foundations of a frontend project **once**, before the first
feature with a screen. Every visual feature depends on them, and Spec Kit has
no place for them by default: the constitution holds rules, not values, and
each feature spec is a silo.

This command produces two paste-ready drafts and writes them to
`.specify/design/foundations.md`:

1. **Principles** for `/speckit-constitution` — the non-negotiable rules.
2. **A feature description** for `/speckit-specify` — the foundations feature
   (`design-foundations`) whose plan turns the tokens into a UI contract and
   whose implementation makes them code.

It never edits the constitution or `specs/` itself: those belong to their
commands.

Context: one developer building product with AI agents, and that developer
decides. Ask for decisions, not approvals.

## User Input

```text
$ARGUMENTS
```

Optional. `check` runs only the detection step and reports. Anything else is
treated as context for the interview (a brand, a reference site, a constraint).

## Step 1: Detect what already exists

Before asking anything, scan the project. **Extend what exists; never
replace it.**

- CSS custom properties: `:root`, `[data-theme]`, files named `tokens`,
  `variables`, `theme`.
- Tailwind: `tailwind.config.*`, `@theme` blocks, `globals.css`.
- UI framework themes: Material UI, Chakra, shadcn/ui, Radix themes, Mantine.
- Design token JSON: Style Dictionary, Figma exports, `tokens.json`.
- Component directories, Storybook (`.storybook/`), font loading
  (`@font-face`, `next/font`, `<link rel="preload">`).
- `package.json` UI dependencies.
- An existing `.specify/design/foundations.md` or `specs/*design*`.

Report in one short block: found / partial / nothing. If foundations already
exist, say so and offer to **update** rather than redo. If `$ARGUMENTS` was
`check`, stop here.

## Step 2: Interview

Two rounds, **three questions per turn maximum**, each with a suggested
answer when the codebase or the brief gives you a basis — cite it. If there is
a `projectbrief.md`, read it first and do not ask what it already answers.

*Round 1 — direction:*

1. Which aesthetic direction, in one phrase? Offer a short menu and let them
   pick or name their own: functionalist (Rams: "less but better"), Swiss /
   typographic grid, Japanese minimalism (negative space), Scandinavian (warm
   restraint), editorial (type-led), brutalist (raw structure).
2. Which brand constraints are fixed already — colors, typefaces, logo,
   tone? Anything found in step 1 counts.
3. Which platforms and widths matter: mobile-first at 375, desktop-first,
   both? Touch, mouse, or both?

*Round 2 — bar:*

4. Accessibility bar. Suggested: WCAG 2.2 AA — 4.5:1 body, 3:1 large text
   and UI, visible focus, keyboard-complete.
5. Dark mode: yes or no; system preference, manual toggle, or both?
   Suggested: both, via `prefers-color-scheme` and `[data-theme]`.
6. Motion and density: reduced-motion respected? Compact or spacious spacing
   scale (base 4 or 8)?

Close each round with a one-sentence summary and ask for corrections. Then
name what remains open as `[NEEDS CLARIFICATION: what is missing - optionA/optionB?]`.

## Step 3: Draft the constitution principles

Write 4-6 principles. Each is a rule that a plan's Constitution Check can
verify, not a wish:

```markdown
### Visual foundations (NON-NEGOTIABLE)
- All UI consumes design tokens; no raw color, size or spacing values in
  components. Tokens are semantic (`--color-surface`), not literal
  (`--blue-500`).
- Aesthetic direction: <chosen direction>. New components match it or the
  deviation is recorded in the feature's plan.
- Accessibility: WCAG 2.2 AA minimum — contrast, keyboard, visible focus,
  reduced-motion respected.
- Dark mode is designed, not inverted: separate palette, adjusted shadows and
  contrast verified in both themes.
- Mobile-first: layouts start at 375px single column; touch targets 44x44px
  minimum; body text 16px minimum.
```

Adapt the list to the answers. Drop what does not apply; do not pad.

## Step 4: Draft the foundations feature

Write the description the developer will paste into `/speckit-specify`. Keep
it technology-agnostic — the spec must not name Tailwind or CSS variables;
that is the plan's job:

```text
Feature: design-foundations. Establish the visual system every screen of
<project> builds on. Users: the developer and every future visual feature.
It provides a semantic token set (color for light and dark themes, type
ramp, spacing scale, radii, elevation, motion) and the base components
<list from interview: button, input, card...>. Success criteria: every
screen in the product uses tokens only; every text/background pair meets
WCAG AA in both themes; the same screen renders correctly at 375, 768 and
1280 wide; reduced motion is honoured. Out of scope: page layouts, feature
components, marketing pages, illustration.
```

Add a **Notes for the plan** block the developer can hand to `/speckit-plan`:
token format by stack (Tailwind theme extension, CSS custom properties, or a
`theme.ts` for CSS-in-JS), tokens delivered as a UI contract under
`contracts/`, and which existing files from step 1 are extended.

## Step 5: Save and hand off

Write `.specify/design/foundations.md` with: detection summary, decisions
(with the developer's answers, suggested answers marked as agent-sourced),
the principles block, the feature description, notes for the plan, and open
questions. Then tell the developer, in this order:

1. `/speckit-constitution` — paste the principles.
2. `/speckit-specify` — paste the feature description.
3. `/speckit-plan` — hand it the notes.

## Rules

- **Never invent.** Unanswered becomes a `[NEEDS CLARIFICATION]` marker.
- **Extend, do not replace** anything found in step 1.
- **Three questions per turn**, never the whole questionnaire at once.
- **Spec stays technology-agnostic**; technology goes in the notes for the
  plan.
- **Never write to the constitution or `specs/`** — only to
  `.specify/design/foundations.md`.
- One page. If it grows, cut the menu, not the rules.
