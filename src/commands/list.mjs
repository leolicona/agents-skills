import { searchCatalog } from '../registry.mjs';
import { color, truncate } from '../ui.mjs';

export async function list({ positionals, values }) {
  const query = positionals[0] ?? '';
  const skills = await searchCatalog(query);

  if (values.json) {
    console.log(
      JSON.stringify(
        skills.map(({ id, name, description, tags, version }) => ({
          id,
          name,
          description,
          tags,
          version,
        })),
        null,
        2,
      ),
    );
    return 0;
  }

  if (!skills.length) {
    console.log(query ? `Sin resultados para "${query}".` : 'El catalogo esta vacio.');
    return query ? 1 : 0;
  }

  const width = Math.max(...skills.map((skill) => skill.id.length));
  console.log(color.bold(`Skills disponibles (${skills.length})`));
  console.log('');

  for (const skill of skills) {
    const id = color.cyan(skill.id.padEnd(width));
    console.log(`  ${id}  ${truncate(skill.description)}`);
    if (values.long && skill.tags.length) {
      console.log(`  ${' '.repeat(width)}  ${color.dim(skill.tags.join(', '))}`);
    }
  }

  console.log('');
  console.log(color.dim('Instalar:  npx @leolicona/agent-skills add <skill>'));
  return 0;
}
