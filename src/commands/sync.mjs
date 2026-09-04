import path from 'node:path';
import { syncAgentsMd } from '../agents-md.mjs';
import { color, ok, skip } from '../ui.mjs';

export async function sync({ values }) {
  const cwd = path.resolve(values.dir ?? process.cwd());
  const result = await syncAgentsMd(cwd, { dryRun: Boolean(values['dry-run']) });

  if (result.changed) ok(`AGENTS.md updated (${result.count} skill${result.count === 1 ? '' : 's'})`);
  else skip('AGENTS.md already up to date');

  if (values['dry-run']) console.log(color.yellow('Dry run: nothing was written.'));
  return 0;
}
