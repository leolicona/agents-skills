import path from 'node:path';
import { syncAgentsMd } from '../agents-md.mjs';
import { color, ok, skip } from '../ui.mjs';

export async function sync({ values }) {
  const cwd = path.resolve(values.dir ?? process.cwd());
  const result = await syncAgentsMd(cwd, { dryRun: Boolean(values['dry-run']) });

  if (result.changed) ok(`AGENTS.md actualizado (${result.count} skills)`);
  else skip('AGENTS.md ya estaba al dia');

  if (values['dry-run']) console.log(color.yellow('Simulacion (--dry-run): no se escribio nada.'));
  return 0;
}
