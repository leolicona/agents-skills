#!/usr/bin/env node
/** Valida el catalogo: frontmatter, nombres y limites de tamano. */
import fs from 'node:fs/promises';
import path from 'node:path';
import { catalogDir } from '../src/paths.mjs';
import { readSkillsFrom } from '../src/registry.mjs';

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const MAX_DESCRIPTION = 500;
const MAX_LINES = 500;

const errors = [];
const warnings = [];

const dir = catalogDir();
const skills = await readSkillsFrom(dir);
const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
const dirs = entries
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
  .map((entry) => entry.name);

if (!skills.length) {
  console.error(`error  el catalogo ${path.relative(process.cwd(), dir) || dir} no tiene ninguna skill`);
  process.exit(1);
}

for (const dir of dirs) {
  if (!skills.some((skill) => skill.id === dir)) {
    errors.push(`${dir}/: falta SKILL.md`);
  }
}

for (const skill of skills) {
  const at = `${skill.id}/SKILL.md`;

  if (!SLUG.test(skill.id)) errors.push(`${at}: la carpeta debe ir en kebab-case`);
  if (!skill.frontmatter.name) errors.push(`${at}: falta "name" en el frontmatter`);
  else if (skill.frontmatter.name !== skill.id) {
    errors.push(`${at}: name "${skill.frontmatter.name}" no coincide con la carpeta "${skill.id}"`);
  }

  if (!skill.description) errors.push(`${at}: falta "description" en el frontmatter`);
  else if (skill.description.length > MAX_DESCRIPTION) {
    errors.push(`${at}: description de ${skill.description.length} caracteres (max ${MAX_DESCRIPTION})`);
  } else if (!/\busala\b|\busar\b|\bcuando\b|\buse\b|\bwhen\b/i.test(skill.description)) {
    warnings.push(`${at}: la description no dice cuando usar la skill`);
  }

  const lines = skill.body.split('\n').length;
  if (lines > MAX_LINES) warnings.push(`${at}: ${lines} lineas (recomendado < ${MAX_LINES})`);
  if (!/##\s+(Cuando usar|When to use)/i.test(skill.body)) {
    warnings.push(`${at}: falta la seccion "Cuando usar esta skill"`);
  }
}

for (const warning of warnings) console.warn(`aviso  ${warning}`);
for (const error of errors) console.error(`error  ${error}`);

console.log(
  `\n${skills.length} skills validadas, ${errors.length} errores, ${warnings.length} avisos.`,
);
process.exit(errors.length ? 1 : 0);
