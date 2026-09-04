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
    throw new CliError(error.message, { hint: 'Run `agent-skills --help`.' });
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
    throw new CliError(`Unknown command: "${command}".`, {
      hint: `Available: ${[...new Set(Object.keys(COMMANDS))].join(', ')}`,
    });
  }

  return (await handler({ positionals: rest, values })) ?? 0;
}

function printHelp() {
  const b = color.bold;
  console.log(`${b(pkg.name)} v${pkg.version}
${pkg.description}

${b('Usage')}
  npx ${pkg.name} <command> [options]

${b('Commands')}
  list [text]         List the catalog (filtered by free text)
  info <skill>        Show a skill's description and contents
  add <skill...>      Install skills into the project (--all for every one)
  remove <skill...>   Remove installed skills
  installed           Show what is installed in this project
  sync                Regenerate the skills block in AGENTS.md
  new <name>          Scaffold a new skill

${b('Options')}
  -t, --target <ids>  Targets: ${TARGET_IDS.join(', ')}, all
                      (auto-detected by default)
  -d, --dir <path>    Project directory (default: the current one)
  -a, --all           Apply to every skill in the catalog
  -f, --force         Overwrite skills that are already installed
      --dry-run       Simulate without writing to disk
      --json          JSON output (list, info, installed)
  -l, --long          More detail in list
  -h, --help          This help
  -v, --version       Package version

${b('Examples')}
  npx ${pkg.name} list
  npx ${pkg.name} add project-brief
  npx ${pkg.name} add --all --target claude,agents-md
  npx ${pkg.name} remove project-brief --dry-run`);
}
