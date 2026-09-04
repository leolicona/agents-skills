import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { findSkill, listCatalog, searchCatalog } from '../src/registry.mjs';

const fixtures = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures/catalog');
process.env.AGENT_SKILLS_CATALOG = fixtures;

test('el catalogo trae skills con name y description coherentes', async () => {
  const skills = await listCatalog();
  assert.ok(skills.length > 0);
  for (const skill of skills) {
    assert.equal(skill.frontmatter.name, skill.id, `${skill.id}: name != carpeta`);
    assert.ok(skill.description.length > 20, `${skill.id}: description demasiado corta`);
  }
});

test('findSkill localiza por id y falla con sugerencia', async () => {
  const skill = await findSkill('demo-basica');
  assert.equal(skill.id, 'demo-basica');
  await assert.rejects(() => findSkill('no-existe-xyz'), /No existe la skill/);
});

test('searchCatalog filtra por texto libre', async () => {
  const results = await searchCatalog('recursos');
  assert.deepEqual(results.map((skill) => skill.id), ['demo-con-recursos']);
  assert.equal((await searchCatalog('zzzzz')).length, 0);
});
