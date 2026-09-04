import fs from 'node:fs/promises';
import path from 'node:path';
import { stringifyFrontmatter } from '../frontmatter.mjs';
import { exists } from '../targets.mjs';
import { CliError, color, ok } from '../ui.mjs';

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const TEMPLATE = `## When to use this skill

Describe the concrete signals that should trigger this skill.

## How to work

1. First concrete step.
2. Second concrete step.
3. What to deliver at the end.

## Rules

- One rule per line, in the imperative.
- Skip generic advice the agent already follows by default.

## Example

Input:

\`\`\`text
(paste a real case here)
\`\`\`

Expected output:

\`\`\`text
(paste the correct answer here)
\`\`\`
`;

export async function createSkill({ positionals, values }) {
  const id = positionals[0];
  if (!id) throw new CliError('Missing name.', { hint: 'agent-skills new <my-skill>' });
  if (!SLUG.test(id)) {
    throw new CliError(`"${id}" is not a valid name.`, {
      hint: 'Use lowercase kebab-case, for example: review-pull-request',
    });
  }

  const base = path.resolve(values.dir ?? process.cwd(), values.into ?? 'skills');
  const dir = path.join(base, id);
  if (await exists(dir)) throw new CliError(`${path.relative(process.cwd(), dir)} already exists.`);

  const frontmatter = stringifyFrontmatter({
    name: id,
    description:
      values.description ??
      'In one sentence: what the skill does and when the agent should use it.',
  });

  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, 'SKILL.md'), `${frontmatter}\n\n# ${id}\n\n${TEMPLATE}`, 'utf8');

  ok(`Skill created at ${path.relative(process.cwd(), dir)}/SKILL.md`);
  console.log(color.dim('Edit the description: it is all the agent reads when deciding to use it.'));
  return 0;
}
