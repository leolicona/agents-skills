import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));

/** Raiz del paquete instalado (donde viven `skills/` y `src/`). */
export const packageRoot = path.resolve(here, '..');

/** Catalogo de skills que viaja dentro del paquete. */
export const catalogDir = path.join(packageRoot, 'skills');
