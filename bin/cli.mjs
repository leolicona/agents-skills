#!/usr/bin/env node
import { run } from '../src/cli.mjs';
import { CliError, color } from '../src/ui.mjs';

try {
  process.exitCode = await run(process.argv.slice(2));
} catch (error) {
  if (error instanceof CliError) {
    console.error(`${color.red('Error:')} ${error.message}`);
    if (error.hint) console.error(color.dim(error.hint));
  } else {
    console.error(`${color.red('Error inesperado:')} ${error?.stack ?? error}`);
  }
  process.exitCode = 1;
}
