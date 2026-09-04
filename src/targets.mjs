import fs from 'node:fs/promises';
import path from 'node:path';
import { readSkillsFrom } from './registry.mjs';
import { CliError } from './ui.mjs';

/**
 * Destinos soportados. Cada destino sabe en que carpeta del proyecto viven
 * las skills; `agents-md` no copia archivos, solo mantiene un bloque en
 * AGENTS.md (ver agents-md.mjs).
 */
export const TARGETS = {
  claude: {
    id: 'claude',
    label: 'Claude Code',
    dir: '.claude/skills',
    marker: '.claude',
  },
  opencode: {
    id: 'opencode',
    label: 'OpenCode',
    dir: '.opencode/skill',
    marker: '.opencode',
  },
  'agents-md': {
    id: 'agents-md',
    label: 'AGENTS.md',
    dir: null,
    marker: 'AGENTS.md',
  },
};

export const TARGET_IDS = Object.keys(TARGETS);

/** Convierte `--target claude,opencode` (o `all`) en una lista de destinos. */
export function resolveTargets(value) {
  const requested = String(value)
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  if (requested.includes('all')) return TARGET_IDS.map((id) => TARGETS[id]);

  return requested.map((id) => {
    const target = TARGETS[id];
    if (!target) {
      throw new CliError(`Destino desconocido: "${id}".`, {
        hint: `Validos: ${TARGET_IDS.join(', ')}, all`,
      });
    }
    return target;
  });
}

/**
 * Detecta que destinos ya usa el proyecto. Siempre incluye al menos un
 * destino con carpeta (Claude Code por defecto), porque `agents-md` solo
 * indexa skills: no puede guardarlas.
 */
export async function detectTargets(cwd) {
  const detected = [];
  for (const id of TARGET_IDS) {
    const target = TARGETS[id];
    if (await exists(path.join(cwd, target.marker))) detected.push(target);
  }
  if (!detected.some((target) => target.dir)) detected.unshift(TARGETS.claude);
  return detected;
}

export function targetDir(target, cwd) {
  if (!target.dir) return null;
  return path.join(cwd, target.dir);
}

/** Skills ya instaladas en un destino del proyecto. */
export async function installedIn(target, cwd) {
  const dir = targetDir(target, cwd);
  if (!dir) return [];
  return readSkillsFrom(dir);
}

/** Union de skills instaladas en todos los destinos con carpeta. */
export async function installedSkills(cwd) {
  const byId = new Map();
  for (const id of TARGET_IDS) {
    for (const skill of await installedIn(TARGETS[id], cwd)) {
      if (!byId.has(skill.id)) byId.set(skill.id, skill);
    }
  }
  return [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * Copia la carpeta de la skill al destino.
 * Devuelve 'installed' | 'updated' | 'skipped'.
 */
export async function installSkill(skill, target, cwd, { force = false, dryRun = false } = {}) {
  const base = targetDir(target, cwd);
  if (!base) return 'skipped';

  const dest = path.join(base, skill.id);
  const already = await exists(path.join(dest, 'SKILL.md'));
  if (already && !force) return 'skipped';
  if (dryRun) return already ? 'updated' : 'installed';

  await fs.mkdir(base, { recursive: true });
  if (already) await fs.rm(dest, { recursive: true, force: true });
  await fs.cp(skill.dir, dest, { recursive: true });
  return already ? 'updated' : 'installed';
}

/** Borra la skill del destino. Devuelve true si habia algo que borrar. */
export async function removeSkill(skillId, target, cwd, { dryRun = false } = {}) {
  const base = targetDir(target, cwd);
  if (!base) return false;

  const dest = path.join(base, skillId);
  if (!(await exists(dest))) return false;
  if (!dryRun) await fs.rm(dest, { recursive: true, force: true });
  return true;
}

export async function exists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}
