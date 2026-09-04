import { findSkill } from '../registry.mjs';
import { CliError, color } from '../ui.mjs';

export async function info({ positionals, values }) {
  const id = positionals[0];
  if (!id) throw new CliError('Falta el nombre de la skill.', { hint: 'agent-skills info <skill>' });

  const skill = await findSkill(id);

  if (values.json) {
    console.log(
      JSON.stringify(
        {
          id: skill.id,
          name: skill.name,
          description: skill.description,
          version: skill.version,
          tags: skill.tags,
          allowedTools: skill.allowedTools,
        },
        null,
        2,
      ),
    );
    return 0;
  }

  console.log(color.bold(skill.id));
  console.log('');
  console.log(skill.description);
  console.log('');
  if (skill.tags.length) console.log(`${color.dim('tags')}          ${skill.tags.join(', ')}`);
  if (skill.allowedTools.length) {
    console.log(`${color.dim('allowed-tools')} ${skill.allowedTools.join(', ')}`);
  }
  console.log(`${color.dim('archivo')}       ${skill.file}`);
  console.log('');
  console.log(color.dim('--- SKILL.md ---'));
  console.log(skill.body.trim());
  return 0;
}
