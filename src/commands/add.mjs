import path from 'node:path';
import { findSkill, listCatalog } from '../registry.mjs';
import { syncAgentsMd } from '../agents-md.mjs';
import { detectTargets, exists, installSkill, resolveTargets } from '../targets.mjs';
import { CliError, color, ok, skip, warn } from '../ui.mjs';

export async function add({ positionals, values }) {
  const cwd = path.resolve(values.dir ?? process.cwd());
  const dryRun = Boolean(values['dry-run']);

  const skills = values.all
    ? await listCatalog()
    : await Promise.all(positionals.map((id) => findSkill(id)));

  if (!skills.length) {
    throw new CliError('Indica al menos una skill.', {
      hint: 'agent-skills add <skill> [...]  |  agent-skills add --all',
    });
  }

  const targets = values.target ? resolveTargets(values.target) : await detectTargets(cwd);
  const fileTargets = targets.filter((target) => target.dir);
  const wantsAgentsMd = targets.some((target) => target.id === 'agents-md');

  console.log(
    `${color.bold('Destinos:')} ${targets.map((target) => target.label).join(', ')}  ${color.dim(cwd)}`,
  );
  console.log('');

  let changes = 0;
  for (const skill of skills) {
    for (const target of fileTargets) {
      const result = await installSkill(skill, target, cwd, { force: values.force, dryRun });
      const where = `${target.dir}/${skill.id}/`;
      if (result === 'skipped') {
        skip(`${skill.id} ya existe en ${target.label} (usa --force para sobrescribir)`);
      } else {
        changes++;
        ok(`${skill.id} ${result === 'updated' ? 'actualizada' : 'instalada'} en ${where}`);
      }
    }
  }

  if (!fileTargets.length) {
    warn('Ningun destino copia archivos; solo se actualizara AGENTS.md.');
  }

  if (wantsAgentsMd || (await hasAgentsMd(cwd))) {
    const result = await syncAgentsMd(cwd, { dryRun });
    if (result.changed) {
      changes++;
      ok(`AGENTS.md actualizado (${result.count} skills)`);
    } else {
      skip('AGENTS.md ya estaba al dia');
    }
  }

  console.log('');
  if (dryRun) {
    console.log(color.yellow('Simulacion (--dry-run): no se escribio nada.'));
  } else if (!changes) {
    console.log(color.dim('Sin cambios.'));
  }
  return 0;
}

function hasAgentsMd(cwd) {
  return exists(path.join(cwd, 'AGENTS.md'));
}
