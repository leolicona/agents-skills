import path from 'node:path';
import { TARGET_IDS, TARGETS, installedIn } from '../targets.mjs';
import { color, truncate } from '../ui.mjs';

export async function installed({ values }) {
  const cwd = path.resolve(values.dir ?? process.cwd());
  const report = [];

  for (const id of TARGET_IDS) {
    const target = TARGETS[id];
    if (!target.dir) continue;
    report.push({ target, skills: await installedIn(target, cwd) });
  }

  if (values.json) {
    console.log(
      JSON.stringify(
        report.map(({ target, skills }) => ({
          target: target.id,
          dir: target.dir,
          skills: skills.map((skill) => skill.id),
        })),
        null,
        2,
      ),
    );
    return 0;
  }

  let total = 0;
  for (const { target, skills } of report) {
    console.log(color.bold(`${target.label}  ${color.dim(target.dir)}`));
    if (!skills.length) {
      console.log(`  ${color.dim('(vacio)')}`);
    }
    for (const skill of skills) {
      total++;
      console.log(`  ${color.cyan(skill.id)}  ${truncate(skill.description, 70)}`);
    }
    console.log('');
  }

  if (!total) console.log(color.dim('Aun no hay skills instaladas. Prueba `agent-skills add --all`.'));
  return 0;
}
