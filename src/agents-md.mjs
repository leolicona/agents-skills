import fs from 'node:fs/promises';
import path from 'node:path';
import { TARGETS, exists, installedIn } from './targets.mjs';
import { truncate } from './ui.mjs';

export const START = '<!-- agent-skills:start -->';
export const END = '<!-- agent-skills:end -->';

const HEADER = [
  '## Available skills',
  '',
  'These skills are installed in this repository. Before starting a task that',
  'matches one of the descriptions below, read that skill\'s full `SKILL.md`',
  'and follow its instructions.',
  '',
];

/**
 * Reescribe (o crea) el bloque gestionado de AGENTS.md con las skills que
 * haya instaladas en el proyecto. Todo lo que el usuario escriba fuera de los
 * marcadores se conserva intacto.
 */
export async function syncAgentsMd(cwd, { dryRun = false } = {}) {
  const file = path.join(cwd, 'AGENTS.md');
  const skills = await collectSkills(cwd);
  const block = renderBlock(skills);

  const current = (await exists(file)) ? await fs.readFile(file, 'utf8') : null;
  const next = current === null ? `# AGENTS.md\n\n${block}\n` : replaceBlock(current, block);

  if (current === next) return { file, changed: false, count: skills.length };
  if (!dryRun) await fs.writeFile(file, next, 'utf8');
  return { file, changed: true, count: skills.length };
}

async function collectSkills(cwd) {
  const byId = new Map();
  for (const id of ['claude', 'opencode']) {
    for (const skill of await installedIn(TARGETS[id], cwd)) {
      const entry = byId.get(skill.id) ?? { ...skill, paths: [] };
      entry.paths.push(`${TARGETS[id].dir}/${skill.id}/SKILL.md`);
      byId.set(skill.id, entry);
    }
  }
  return [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
}

export function renderBlock(skills) {
  const lines = [START, ...HEADER];

  if (!skills.length) {
    lines.push('_No skills installed yet._');
  } else {
    lines.push('| Skill | When to use it | File |', '| --- | --- | --- |');
    for (const skill of skills) {
      lines.push(
        `| \`${skill.id}\` | ${escapeCell(truncate(skill.description, 160))} | \`${skill.paths[0]}\` |`,
      );
    }
  }

  lines.push('', END);
  return lines.join('\n');
}

function escapeCell(text) {
  return String(text).replace(/\|/g, '\\|');
}

function replaceBlock(content, block) {
  const start = content.indexOf(START);
  const end = content.indexOf(END);

  if (start !== -1 && end !== -1 && end > start) {
    return content.slice(0, start) + block + content.slice(end + END.length);
  }
  return `${content.replace(/\s*$/, '')}\n\n${block}\n`;
}
