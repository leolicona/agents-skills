import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));

/** Raiz del paquete instalado (donde viven `skills/` y `src/`). */
export const packageRoot = path.resolve(here, '..');

/**
 * Catalogo activo. Por defecto el que viaja dentro del paquete; se puede
 * apuntar a otro con AGENT_SKILLS_CATALOG (util para catalogos privados y
 * para las pruebas).
 */
export function catalogDir() {
  const override = process.env.AGENT_SKILLS_CATALOG;
  return override ? path.resolve(override) : path.join(packageRoot, 'skills');
}
