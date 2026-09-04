# agents-skills

A catalog of **skills** (`SKILL.md`) for AI agents, installable into any
project with a single `npx` command.

A skill is a folder with a `SKILL.md` inside: specialized instructions the
agent loads only when the task calls for them. This repository is both the
catalog and the installer.

```bash
npx @leolicona/agent-skills add project-brief
```

## Quick start

```bash
# Browse the catalog
npx @leolicona/agent-skills list

# Install every skill into the current project
npx @leolicona/agent-skills add --all

# See what is installed
npx @leolicona/agent-skills installed
```

Nothing to install permanently and no dependencies to pull: the CLI runs on
Node >= 18.17 and uses no external packages.

## Supported targets

The CLI detects which agents the project uses and copies the skill into the
right directory:

| Target | Directory | Detected by |
| --- | --- | --- |
| `claude` | `.claude/skills/<skill>/` | `.claude/` exists |
| `opencode` | `.opencode/skill/<skill>/` | `.opencode/` exists |
| `agents-md` | managed block in `AGENTS.md` | `AGENTS.md` exists |

If none is detected, skills go to `.claude/skills/` (the reference layout for
`SKILL.md`). Force the targets with `--target`:

```bash
npx @leolicona/agent-skills add project-brief --target claude,opencode
npx @leolicona/agent-skills add --all --target all
```

`AGENTS.md` does not store skills: it keeps an index between markers so that
agents like Codex, Cursor or Copilot know which skills exist and where to read
them. Anything you write outside the markers is left untouched:

```markdown
<!-- agent-skills:start -->
## Available skills
| Skill | When to use it | File |
| --- | --- | --- |
| `project-brief` | Interviews the user... | `.claude/skills/project-brief/SKILL.md` |
<!-- agent-skills:end -->
```

## Catalog

| Skill | What it does |
| --- | --- |
| `project-brief` | Interviews the user in rounds and writes a `projectbrief.md` that feeds GitHub Spec Kit |
| `tech-feasibility` | Interviews, researches what already exists, and spikes only what reading cannot settle |

Inspect a skill:

```bash
npx @leolicona/agent-skills info project-brief
```

## Commands

| Command | What it does |
| --- | --- |
| `list [text]` | Lists the catalog, filtered by free text |
| `info <skill>` | Shows a skill's metadata and contents |
| `add <skill...>` | Installs skills (`--all` for every one) |
| `remove <skill...>` | Removes installed skills |
| `installed` | Shows what is installed in the project |
| `sync` | Regenerates the skills block in `AGENTS.md` |
| `new <name>` | Scaffolds a new skill |

Options: `--target`, `--dir`, `--all`, `--force`, `--dry-run`, `--json`,
`--long`, `--help`, `--version`.

```bash
# Dry run, writes nothing
npx @leolicona/agent-skills add --all --dry-run

# Install into another project
npx @leolicona/agent-skills add project-brief --dir ../another-project

# Overwrite a skill you edited locally
npx @leolicona/agent-skills add project-brief --force
```

Point the CLI at a different catalog (a private one, for instance) with the
`AGENT_SKILLS_CATALOG` environment variable.

## Anatomy of a skill

```
skills/my-skill/
  SKILL.md          # required
  references/       # long documentation, read on demand
  scripts/          # executable helpers
  assets/           # templates and examples
```

```markdown
---
name: my-skill
description: >-
  What the skill does and when the agent should use it, in one sentence.
tags: [area, topic]
allowed-tools: [Read, Bash]
---

# My skill

## When to use this skill
## How to work
## Rules
## Example
```

The `description` is the trigger: it is the only thing the agent reads before
deciding whether to open the skill. `CONTRIBUTING.md` explains how to write it.

## Contributing

```bash
git clone https://github.com/leolicona/agents-skills.git
cd agents-skills
npx @leolicona/agent-skills new my-skill --dir .   # or: node bin/cli.mjs new my-skill
npm run check                                      # validates the catalog and runs the tests
```

Details in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
