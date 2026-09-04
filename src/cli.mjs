import { parseArgs } from 'node:util';
import { createRequire } from 'node:module';
import { add } from './commands/add.mjs';
import { createSkill } from './commands/new.mjs';
import { info } from './commands/info.mjs';
import { installed } from './commands/installed.mjs';
import { list } from './commands/list.mjs';
import { remove } from './commands/remove.mjs';
import { sync } from './commands/sync.mjs';
import { TARGET_IDS } from './targets.mjs';
import { CliError, color } from './ui.mjs';

const require = createRequire(import.meta.url);
const pkg = require('../package.json');

const OPTIONS = {
  target: { type: 'string', short: 't' },
  dir: { type: 'string', short: 'd' },
  into: { type: 'string' },
  description: { type: 'string' },
  all: { type: 'boolean', short: 'a' },
  force: { type: 'boolean', short: 'f' },
  json: { type: 'boolean' },
  long: { type: 'boolean', short: 'l' },
  'dry-run': { type: 'boolean' },
  help: { type: 'boolean', short: 'h' },
  version: { type: 'boolean', short: 'v' },
};

const COMMANDS = {
  list,
  search: list,
  add,
  install: add,
  remove,
  rm: remove,
  info,
  show: info,
  installed,
  status: installed,
  sync,
  new: createSkill,
};

export async function run(argv) {
  let parsed;
  try {
    parsed = parseArgs({ args: argv, options: OPTIONS, allowPositionals: true });
  } catch (error) {
    throw new CliError(error.message, { hint: 'Ejecuta `agent-skills --help`.' });
  }

  const { values, positionals } = parsed;

  if (values.version) {
    console.log(pkg.version);
    return 0;
  }

  const [command, ...rest] = positionals;

  if (!command || values.help || command === 'help') {
    printHelp();
    return 0;
  }

  const handler = COMMANDS[command];
  if (!handler) {
    throw new CliError(`Comando desconocido: "${command}".`, {
      hint: `Disponibles: ${[...new Set(Object.keys(COMMANDS))].join(', ')}`,
    });
  }

  return (await handler({ positionals: rest, values })) ?? 0;
}

function printHelp() {
  const b = color.bold;
  console.log(`${b(pkg.name)} v${pkg.version}
${pkg.description}

${b('Uso')}
  npx ${pkg.name} <comando> [opciones]

${b('Comandos')}
  list [texto]        Lista el catalogo de skills (filtra por texto)
  info <skill>        Muestra la descripcion y el contenido de una skill
  add <skill...>      Instala skills en el proyecto (--all para todas)
  remove <skill...>   Elimina skills instaladas
  installed           Muestra que hay instalado en este proyecto
  sync                Regenera el bloque de skills en AGENTS.md
  new <nombre>        Crea el esqueleto de una skill nueva

${b('Opciones')}
  -t, --target <ids>  Destinos: ${TARGET_IDS.join(', ')}, all
                      (por defecto se autodetectan)
  -d, --dir <ruta>    Directorio del proyecto (por defecto: el actual)
  -a, --all           Aplica a todas las skills del catalogo
  -f, --force         Sobrescribe skills ya instaladas
      --dry-run       Simula sin escribir en disco
      --json          Salida en JSON (list, info, installed)
  -l, --long          Mas detalle en list
  -h, --help          Esta ayuda
  -v, --version       Version del paquete

${b('Ejemplos')}
  npx ${pkg.name} list
  npx ${pkg.name} add conventional-commits code-review
  npx ${pkg.name} add --all --target claude,agents-md
  npx ${pkg.name} remove code-review --dry-run`);
}
