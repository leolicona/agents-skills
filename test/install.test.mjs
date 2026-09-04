import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { run } from '../src/cli.mjs';
import { START, END } from '../src/agents-md.mjs';

async function tempProject() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'agent-skills-'));
  test.after(() => fs.rm(dir, { recursive: true, force: true }));
  return dir;
}

const read = (file) => fs.readFile(file, 'utf8').catch(() => null);

test('add instala en Claude Code por defecto', async () => {
  const dir = await tempProject();
  await run(['add', 'code-review', '--dir', dir]);

  const skill = await read(path.join(dir, '.claude/skills/code-review/SKILL.md'));
  assert.match(skill ?? '', /name: code-review/);
});

test('add --target all copia a los dos directorios y escribe AGENTS.md', async () => {
  const dir = await tempProject();
  await run(['add', 'unit-tests', '--target', 'all', '--dir', dir]);

  assert.ok(await read(path.join(dir, '.claude/skills/unit-tests/SKILL.md')));
  assert.ok(await read(path.join(dir, '.opencode/skill/unit-tests/SKILL.md')));

  const agents = await read(path.join(dir, 'AGENTS.md'));
  assert.ok(agents.includes(START) && agents.includes(END));
  assert.match(agents, /`unit-tests`/);
});

test('AGENTS.md conserva el contenido fuera del bloque gestionado', async () => {
  const dir = await tempProject();
  const file = path.join(dir, 'AGENTS.md');
  await fs.writeFile(file, '# Mi proyecto\n\nReglas propias.\n', 'utf8');

  await run(['add', 'safe-refactor', '--dir', dir]);
  let agents = await read(file);
  assert.match(agents, /Reglas propias\./);
  assert.match(agents, /`safe-refactor`/);

  await run(['add', 'unit-tests', '--dir', dir]);
  agents = await read(file);
  assert.equal(agents.match(new RegExp(START.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'), 'g')).length, 1);
  assert.match(agents, /Reglas propias\./);
});

test('add no sobrescribe sin --force y si con --force', async () => {
  const dir = await tempProject();
  const file = path.join(dir, '.claude/skills/code-review/SKILL.md');

  await run(['add', 'code-review', '--dir', dir]);
  await fs.writeFile(file, 'editado a mano', 'utf8');

  await run(['add', 'code-review', '--dir', dir]);
  assert.equal(await read(file), 'editado a mano');

  await run(['add', 'code-review', '--dir', dir, '--force']);
  assert.match(await read(file), /name: code-review/);
});

test('--dry-run no escribe nada', async () => {
  const dir = await tempProject();
  await run(['add', '--all', '--target', 'all', '--dir', dir, '--dry-run']);
  assert.deepEqual(await fs.readdir(dir), []);
});

test('remove borra la skill y actualiza AGENTS.md', async () => {
  const dir = await tempProject();
  await run(['add', 'code-review', 'unit-tests', '--target', 'all', '--dir', dir]);
  await run(['remove', 'code-review', '--dir', dir]);

  assert.equal(await read(path.join(dir, '.claude/skills/code-review/SKILL.md')), null);
  assert.ok(await read(path.join(dir, '.claude/skills/unit-tests/SKILL.md')));

  const agents = await read(path.join(dir, 'AGENTS.md'));
  assert.doesNotMatch(agents, /`code-review`/);
  assert.match(agents, /`unit-tests`/);
});

test('new crea el esqueleto de una skill', async () => {
  const dir = await tempProject();
  await run(['new', 'mi-skill-nueva', '--dir', dir]);

  const created = await read(path.join(dir, 'skills/mi-skill-nueva/SKILL.md'));
  assert.match(created, /name: mi-skill-nueva/);
  await assert.rejects(() => run(['new', 'Mi Skill', '--dir', dir]), /no es un nombre valido/);
});

test('comandos y destinos invalidos fallan con CliError', async () => {
  const dir = await tempProject();
  await assert.rejects(() => run(['inventado']), /Comando desconocido/);
  await assert.rejects(() => run(['add', 'code-review', '-t', 'vim', '--dir', dir]), /Destino desconocido/);
});
