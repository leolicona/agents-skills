import test from 'node:test';
import assert from 'node:assert/strict';
import { findSkill, listCatalog, searchCatalog } from '../src/registry.mjs';

test('el catalogo trae skills con name y description', async () => {
  const skills = await listCatalog();
  assert.ok(skills.length > 0);
  for (const skill of skills) {
    assert.equal(skill.frontmatter.name, skill.id, `${skill.id}: name != carpeta`);
    assert.ok(skill.description.length > 20, `${skill.id}: description demasiado corta`);
  }
});

test('findSkill localiza por id y falla con sugerencia', async () => {
  const skill = await findSkill('code-review');
  assert.equal(skill.id, 'code-review');
  await assert.rejects(() => findSkill('no-existe-xyz'), /No existe la skill/);
});

test('searchCatalog filtra por texto libre', async () => {
  const results = await searchCatalog('commit');
  assert.ok(results.some((skill) => skill.id === 'conventional-commits'));
  assert.equal((await searchCatalog('zzzzz')).length, 0);
});
