# Contributing

## Requirements

Node >= 18.17. There are no dependencies to install.

## Adding a skill

```bash
node bin/cli.mjs new my-skill      # creates skills/my-skill/SKILL.md
```

1. Fill in `description`: it must say **what it does** and **when to use it**,
   in one sentence under 500 characters, using the words someone would
   actually type when asking for that task.
2. Write the body as actionable sections: "When to use this skill", "How to
   work" (numbered steps), "Rules" and at least one real example.
   `skills/project-brief/SKILL.md` is the style reference.
3. Validate and test:

```bash
npm run check
```

## What CI validates

`scripts/validate-skills.mjs` fails when:

- a folder under `skills/` has no `SKILL.md`;
- `name` or `description` is missing, or `name` does not match the folder;
- the folder is not in kebab-case;
- the `description` is longer than 500 characters;
- the catalog is empty.

It also warns (without failing) when the description does not say when to use
the skill, when the "When to use this skill" section is missing, or when the
file goes over 500 lines.

## Acceptance criteria

- **One skill, one job.** If the title needs an "and", it is two skills.
- **Instructions, not essays.** Imperative, steps, rules that can be broken.
- **At least one concrete example**, with input and expected output.
- **No truisms** the agent already follows by default.
- **No secrets**, internal paths or personal data.

## Repository layout

```
bin/cli.mjs              CLI entry point
src/                     core (registry, targets, AGENTS.md, commands)
skills/<skill>/SKILL.md  the catalog
scripts/                 validation
test/                    tests with node:test
```

Tests run against a fixture catalog in `test/fixtures/catalog/`, not against
the published skills, so adding or removing a skill never breaks the suite.

## Publishing

```bash
npm version <patch|minor|major>
npm publish --access public
git push --follow-tags
```
