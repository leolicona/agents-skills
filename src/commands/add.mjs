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
    throw new CliError('Name at least one skill.', {
      hint: 'agent-skills add <skill> [...]  |  agent-skills add --all',
    });
  }

  const targets = values.target ? resolveTargets(values.target) : await detectTargets(cwd);
  const fileTargets = targets.filter((target) => target.dir);
  const wantsAgentsMd = targets.some((target) => target.id === 'agents-md');

  console.log(
    `${color.bold('Targets:')} ${targets.map((target) => target.label).join(', ')}  ${color.dim(cwd)}`,
  );
  console.log('');

  let changes = 0;
  for (const skill of skills) {
    for (const target of fileTargets) {
      const result = await installSkill(skill, target, cwd, { force: values.force, dryRun });
      const where = `${target.dir}/${skill.id}/`;
      if (result === 'skipped') {
        skip(`${skill.id} already in ${target.label} (use --force to overwrite)`);
      } else {
        changes++;
        ok(`${skill.id} ${result === 'updated' ? 'updated' : 'installed'} in ${where}`);
      }
    }
  }

  if (!fileTargets.length) {
    warn('No target copies files; only AGENTS.md will be updated.');
  }

  if (wantsAgentsMd || (await hasAgentsMd(cwd))) {
    const result = await syncAgentsMd(cwd, { dryRun });
    if (result.changed) {
      changes++;
      ok(`AGENTS.md updated (${result.count} skill${result.count === 1 ? '' : 's'})`);
    } else {
      skip('AGENTS.md already up to date');
    }
  }

  console.log('');
  if (dryRun) {
    console.log(color.yellow('Dry run: nothing was written.'));
  } else if (!changes) {
    console.log(color.dim('No changes.'));
  }
  return 0;
}

function hasAgentsMd(cwd) {
  return exists(path.join(cwd, 'AGENTS.md'));
}
