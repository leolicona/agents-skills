# agents-skills

Catalogo de **skills** (`SKILL.md`) para agentes de IA, instalables en cualquier
proyecto con un solo comando `npx`.

Una skill es una carpeta con un `SKILL.md`: instrucciones especializadas que el
agente carga solo cuando la tarea lo pide. Este repositorio es a la vez el
catalogo y el instalador.

```bash
npx @leolicona/agent-skills add conventional-commits code-review
```

## Inicio rapido

```bash
# Ver el catalogo
npx @leolicona/agent-skills list

# Instalar todas las skills en el proyecto actual
npx @leolicona/agent-skills add --all

# Ver que hay instalado
npx @leolicona/agent-skills installed
```

No necesitas instalar nada de forma permanente ni tener dependencias: el CLI
funciona con Node >= 18.17 y no usa paquetes externos.

## Destinos soportados

El CLI detecta automaticamente que agentes usa el proyecto y copia la skill al
directorio correcto:

| Destino | Directorio | Se detecta por |
| --- | --- | --- |
| `claude` | `.claude/skills/<skill>/` | existe `.claude/` |
| `opencode` | `.opencode/skill/<skill>/` | existe `.opencode/` |
| `agents-md` | bloque gestionado en `AGENTS.md` | existe `AGENTS.md` |

Si no se detecta ninguno, se instala en `.claude/skills/` (formato de
referencia de `SKILL.md`). Puedes forzar destinos con `--target`:

```bash
npx @leolicona/agent-skills add unit-tests --target claude,opencode
npx @leolicona/agent-skills add --all --target all
```

`AGENTS.md` no guarda skills: mantiene un indice entre marcadores para que
agentes como Codex, Cursor o Copilot sepan que skills existen y donde leerlas.
Todo lo que escribas fuera de los marcadores se conserva intacto:

```markdown
<!-- agent-skills:start -->
## Skills disponibles
| Skill | Cuando usarla | Archivo |
| --- | --- | --- |
| `code-review` | Revisa un diff... | `.claude/skills/code-review/SKILL.md` |
<!-- agent-skills:end -->
```

## Catalogo

| Skill | Para que sirve |
| --- | --- |
| `code-review` | Revisa un diff o PR buscando defectos reales, con escenario de fallo |
| `conventional-commits` | Mensajes de commit segun Conventional Commits, a partir del diff |
| `debug-root-cause` | Diagnostico por hipotesis hasta la causa raiz |
| `pull-request-description` | Titulo y descripcion de PR respetando la plantilla del repo |
| `safe-refactor` | Refactor en pasos pequenos y verificables |
| `skill-author` | Como escribir y auditar un `SKILL.md` |
| `unit-tests` | Pruebas unitarias que fallan cuando el codigo esta mal |

Ver el detalle de una skill:

```bash
npx @leolicona/agent-skills info code-review
```

## Comandos

| Comando | Que hace |
| --- | --- |
| `list [texto]` | Lista el catalogo, filtrando por texto libre |
| `info <skill>` | Muestra metadatos y contenido de una skill |
| `add <skill...>` | Instala skills (`--all` para todas) |
| `remove <skill...>` | Elimina skills instaladas |
| `installed` | Muestra que hay instalado en el proyecto |
| `sync` | Regenera el bloque de skills en `AGENTS.md` |
| `new <nombre>` | Crea el esqueleto de una skill nueva |

Opciones: `--target`, `--dir`, `--all`, `--force`, `--dry-run`, `--json`,
`--long`, `--help`, `--version`.

```bash
# Simular sin escribir
npx @leolicona/agent-skills add --all --dry-run

# Instalar en otro proyecto
npx @leolicona/agent-skills add code-review --dir ../otro-proyecto

# Sobrescribir una skill modificada localmente
npx @leolicona/agent-skills add code-review --force
```

## Anatomia de una skill

```
skills/mi-skill/
  SKILL.md          # obligatorio
  references/       # documentacion larga, se lee bajo demanda
  scripts/          # utilidades ejecutables
  assets/           # plantillas y ejemplos
```

```markdown
---
name: mi-skill
description: >-
  Que hace la skill y cuando debe usarla el agente, en una frase.
tags: [ambito, tema]
allowed-tools: [Read, Bash]
---

# Mi skill

## Cuando usar esta skill
## Como trabajar
## Reglas
## Ejemplo
```

La `description` es el disparador: es lo unico que el agente lee antes de
decidir si abre la skill. La skill `skill-author` explica como escribirla.

## Contribuir

```bash
git clone https://github.com/leolicona/agents-skills.git
cd agents-skills
npx @leolicona/agent-skills new mi-skill --dir .   # o: node bin/cli.mjs new mi-skill
npm run check                                      # valida el catalogo y corre las pruebas
```

Detalles en [CONTRIBUTING.md](CONTRIBUTING.md).

## Licencia

MIT
