import fs from 'node:fs/promises';
import path from 'node:path';
import { stringifyFrontmatter } from '../frontmatter.mjs';
import { exists } from '../targets.mjs';
import { CliError, color, ok } from '../ui.mjs';

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const TEMPLATE = `## Cuando usar esta skill

Describe las senales concretas que deben disparar esta skill.

## Como trabajar

1. Primer paso concreto.
2. Segundo paso concreto.
3. Que entregar al final.

## Reglas

- Una regla por linea, en imperativo.
- Evita instrucciones genericas que el agente ya cumple por defecto.

## Ejemplo

Entrada:

\`\`\`text
(pega aqui un caso real)
\`\`\`

Salida esperada:

\`\`\`text
(pega aqui la respuesta correcta)
\`\`\`
`;

export async function createSkill({ positionals, values }) {
  const id = positionals[0];
  if (!id) throw new CliError('Falta el nombre.', { hint: 'agent-skills new <mi-skill>' });
  if (!SLUG.test(id)) {
    throw new CliError(`"${id}" no es un nombre valido.`, {
      hint: 'Usa kebab-case en minusculas, por ejemplo: revisar-pull-request',
    });
  }

  const base = path.resolve(values.dir ?? process.cwd(), values.into ?? 'skills');
  const dir = path.join(base, id);
  if (await exists(dir)) throw new CliError(`Ya existe ${path.relative(process.cwd(), dir)}.`);

  const frontmatter = stringifyFrontmatter({
    name: id,
    description:
      values.description ??
      'Describe en una frase que hace la skill y cuando debe activarla el agente.',
  });

  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, 'SKILL.md'), `${frontmatter}\n\n# ${id}\n\n${TEMPLATE}`, 'utf8');

  ok(`Skill creada en ${path.relative(process.cwd(), dir)}/SKILL.md`);
  console.log(color.dim('Edita la descripcion: es lo unico que el agente lee para decidir usarla.'));
  return 0;
}
