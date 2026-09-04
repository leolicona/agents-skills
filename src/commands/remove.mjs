import path from 'node:path';
import { syncAgentsMd } from '../agents-md.mjs';
import { TARGET_IDS, TARGETS, exists, removeSkill, resolveTargets } from '../targets.mjs';
import { CliError, color, ok, skip } from '../ui.mjs';

export async function remove({ positionals, values }) {
  if (!positionals.length) {
    throw new CliError('Indica al menos una skill.', { hint: 'agent-skills remove <skill> [...]' });
  }

  const cwd = path.resolve(values.dir ?? process.cwd());
  const dryRun = Boolean(values['dry-run']);
  const targets = values.target
    ? resolveTargets(values.target)
    : TARGET_IDS.map((id) => TARGETS[id]).filter((target) => target.dir);

  let removed = 0;
  for (const id of positionals) {
    for (const target of targets) {
      if (await removeSkill(id, target, cwd, { dryRun })) {
        removed++;
        ok(`${id} eliminada de ${target.dir}/`);
      } else {
        skip(`${id} no estaba en ${target.label}`);
      }
    }
  }

  if (await exists(path.join(cwd, 'AGENTS.md'))) {
    const result = await syncAgentsMd(cwd, { dryRun });
    if (result.changed) ok(`AGENTS.md actualizado (${result.count} skills)`);
  }

  if (!removed) console.log(color.dim('Sin cambios.'));
  return 0;
}
