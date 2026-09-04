/**
 * Minimal YAML frontmatter parser: soporta los escalares que una SKILL.md usa
 * (strings simples o entrecomillados, bloques `|` y `>`, listas inline y con
 * guiones, booleanos y números). No pretende ser YAML completo.
 */

const DELIMITER = /^---\s*$/;

export function parseFrontmatter(text) {
  const source = String(text).replace(/^﻿/, '').replace(/\r\n?/g, '\n');
  const lines = source.split('\n');

  if (!DELIMITER.test(lines[0] ?? '')) {
    return { data: {}, body: source };
  }

  const end = lines.findIndex((line, i) => i > 0 && DELIMITER.test(line));
  if (end === -1) {
    return { data: {}, body: source };
  }

  return {
    data: parseBlock(lines.slice(1, end)),
    body: lines.slice(end + 1).join('\n').replace(/^\n+/, ''),
  };
}

function parseBlock(lines) {
  const data = {};
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || line.trimStart().startsWith('#')) continue;

    const match = /^([A-Za-z0-9_.-]+)\s*:\s*(.*)$/.exec(line);
    if (!match) continue;

    const key = match[1];
    const raw = match[2].trim();

    if (raw === '|' || raw === '>' || raw === '|-' || raw === '>-' || raw === '|+' || raw === '>+') {
      const { value, next } = readBlockScalar(lines, i + 1, raw[0] === '>');
      data[key] = raw.endsWith('-') ? value.replace(/\n+$/, '') : value;
      i = next - 1;
      continue;
    }

    if (raw === '') {
      const { value, next } = readSequence(lines, i + 1);
      if (value !== null) {
        data[key] = value;
        i = next - 1;
        continue;
      }
      data[key] = '';
      continue;
    }

    data[key] = parseScalar(raw);
  }
  return data;
}

function readBlockScalar(lines, start, folded) {
  const collected = [];
  let indent = null;
  let i = start;

  for (; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) {
      collected.push('');
      continue;
    }
    const currentIndent = line.length - line.trimStart().length;
    if (indent === null) {
      if (currentIndent === 0) break;
      indent = currentIndent;
    } else if (currentIndent < indent) {
      break;
    }
    collected.push(line.slice(indent));
  }

  const text = folded
    ? collected.reduce((acc, line) => {
        if (line === '') return `${acc}\n`;
        return acc === '' || acc.endsWith('\n') ? acc + line : `${acc} ${line}`;
      }, '')
    : collected.join('\n');

  return { value: text.replace(/\s+$/, ''), next: i };
}

function readSequence(lines, start) {
  const items = [];
  let i = start;
  for (; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const match = /^\s+-\s+(.*)$/.exec(line);
    if (!match) break;
    items.push(parseScalar(match[1].trim()));
  }
  return items.length ? { value: items, next: i } : { value: null, next: start };
}

function parseScalar(raw) {
  if (raw.startsWith('[') && raw.endsWith(']')) {
    return raw
      .slice(1, -1)
      .split(',')
      .map((item) => parseScalar(item.trim()))
      .filter((item) => item !== '');
  }
  if (
    (raw.startsWith('"') && raw.endsWith('"') && raw.length > 1) ||
    (raw.startsWith("'") && raw.endsWith("'") && raw.length > 1)
  ) {
    const inner = raw.slice(1, -1);
    return raw[0] === '"' ? inner.replace(/\\"/g, '"').replace(/\\n/g, '\n') : inner.replace(/''/g, "'");
  }
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  if (raw === 'null' || raw === '~') return null;
  if (/^-?\d+(\.\d+)?$/.test(raw)) return Number(raw);
  return raw;
}

/** Serializa un objeto plano como frontmatter YAML. */
export function stringifyFrontmatter(data) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.map(quote).join(', ')}]`);
    } else if (typeof value === 'string' && (value.includes('\n') || value.includes(': '))) {
      lines.push(`${key}: >-`);
      for (const chunk of value.split('\n')) lines.push(`  ${chunk}`);
    } else {
      lines.push(`${key}: ${quote(value)}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

function quote(value) {
  if (typeof value !== 'string') return String(value);
  return /^[\w./@-]+$/.test(value) ? value : JSON.stringify(value);
}
