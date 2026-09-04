import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFrontmatter, stringifyFrontmatter } from '../src/frontmatter.mjs';

test('parsea escalares, bloques plegados y listas', () => {
  const { data, body } = parseFrontmatter(
    ['---', 'name: demo', 'description: >-', '  linea uno', '  linea dos', 'tags: [a, b]', 'lista:', '  - x', '  - y', 'activo: true', '---', '', '# Cuerpo'].join('\n'),
  );

  assert.equal(data.name, 'demo');
  assert.equal(data.description, 'linea uno linea dos');
  assert.deepEqual(data.tags, ['a', 'b']);
  assert.deepEqual(data.lista, ['x', 'y']);
  assert.equal(data.activo, true);
  assert.equal(body.trim(), '# Cuerpo');
});

test('conserva saltos en bloques literales', () => {
  const { data } = parseFrontmatter('---\ntexto: |\n  uno\n  dos\n---\n');
  assert.equal(data.texto, 'uno\ndos');
});

test('devuelve el documento intacto sin frontmatter', () => {
  const { data, body } = parseFrontmatter('# Solo cuerpo\n');
  assert.deepEqual(data, {});
  assert.equal(body, '# Solo cuerpo\n');
});

test('tolera CRLF y frontmatter sin cerrar', () => {
  assert.equal(parseFrontmatter('---\r\nname: x\r\n---\r\nhola').data.name, 'x');
  assert.deepEqual(parseFrontmatter('---\nname: x\nhola').data, {});
});

test('stringify produce algo que parse vuelve a leer', () => {
  const original = { name: 'mi-skill', description: 'Hace algo: y mas' };
  const { data } = parseFrontmatter(`${stringifyFrontmatter(original)}\n\ncuerpo`);
  assert.equal(data.name, original.name);
  assert.equal(data.description, original.description);
});
