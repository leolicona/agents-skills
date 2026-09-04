const enabled =
  !process.env.NO_COLOR &&
  process.env.TERM !== 'dumb' &&
  Boolean(process.stdout.isTTY);

const ESC = '\u001b';
const wrap = (open, close) => (text) =>
  enabled ? `${ESC}[${open}m${text}${ESC}[${close}m` : String(text);

export const color = {
  bold: wrap(1, 22),
  dim: wrap(2, 22),
  red: wrap(31, 39),
  green: wrap(32, 39),
  yellow: wrap(33, 39),
  blue: wrap(34, 39),
  cyan: wrap(36, 39),
};

export const info = (msg) => console.log(msg);
export const ok = (msg) => console.log(`${color.green('+')} ${msg}`);
export const skip = (msg) => console.log(color.dim(`- ${msg}`));
export const warn = (msg) => console.warn(`${color.yellow('!')} ${msg}`);

/** Error esperado: el CLI lo imprime sin stack trace. */
export class CliError extends Error {
  constructor(message, { hint } = {}) {
    super(message);
    this.name = 'CliError';
    this.hint = hint;
  }
}

/** Aplana y trunca una descripcion larga para listados de una linea. */
export function truncate(text, max = 96) {
  const flat = String(text).replace(/\s+/g, ' ').trim();
  return flat.length <= max ? flat : `${flat.slice(0, max - 1)}...`;
}
