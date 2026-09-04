import fs from 'node:fs/promises';
import path from 'node:path';
import { parseFrontmatter } from './frontmatter.mjs';
import { catalogDir } from './paths.mjs';
import { CliError } from './ui.mjs';

/** Lee una carpeta de skill (`<dir>/SKILL.md`) y devuelve sus metadatos. */
export async function readSkill(dir) {
  const file = path.join(dir, 'SKILL.md');
  let raw;
  try {
    raw = await fs.readFile(file, 'utf8');
  } catch {
    return null;
  }

  const { data, body } = parseFrontmatter(raw);
  const id = path.basename(dir);

  return {
    id,
    dir,
    file,
    name: typeof data.name === 'string' ? data.name : id,
    description: typeof data.description === 'string' ? data.description : '',
    version: data.version ?? null,
    tags: normalizeList(data.tags),
    allowedTools: normalizeList(data['allowed-tools']),
    body,
    frontmatter: data,
  };
}

function normalizeList(value) {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === 'string' && value.trim()) {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

/** Todas las skills de un directorio, ordenadas por id. */
export async function readSkillsFrom(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  const skills = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('.')) continue;
    const skill = await readSkill(path.join(dir, entry.name));
    if (skill) skills.push(skill);
  }
  return skills.sort((a, b) => a.id.localeCompare(b.id));
}

/** Catalogo que trae el paquete. */
export function listCatalog() {
  return readSkillsFrom(catalogDir());
}

/** Busca una skill del catalogo por id o por `name` del frontmatter. */
export async function findSkill(id) {
  const catalog = await listCatalog();
  const found = catalog.find((skill) => skill.id === id || skill.name === id);
  if (found) return found;

  const suggestions = catalog
    .map((skill) => skill.id)
    .filter((candidate) => candidate.includes(id) || id.includes(candidate))
    .slice(0, 3);

  throw new CliError(`Skill "${id}" is not in the catalog.`, {
    hint: suggestions.length
      ? `Did you mean: ${suggestions.join(', ')}`
      : 'Run `agent-skills list` to see what is available.',
  });
}

/** Filtra el catalogo por texto libre sobre id, descripcion y tags. */
export async function searchCatalog(query) {
  const catalog = await listCatalog();
  if (!query) return catalog;
  const needle = query.toLowerCase();
  return catalog.filter((skill) =>
    [skill.id, skill.name, skill.description, ...skill.tags]
      .join(' ')
      .toLowerCase()
      .includes(needle),
  );
}
