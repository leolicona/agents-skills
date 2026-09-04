# Contribuir

## Requisitos

Node >= 18.17. No hay dependencias que instalar.

## Anadir una skill

```bash
node bin/cli.mjs new mi-skill      # crea skills/mi-skill/SKILL.md
```

1. Rellena `description`: debe decir **que hace** y **cuando usarla**, en una
   frase de menos de 500 caracteres, con las palabras que usaria quien pide la
   tarea.
2. Escribe el cuerpo con secciones accionables: "Cuando usar esta skill",
   "Como trabajar" (pasos numerados), "Reglas" y al menos un ejemplo real.
   `skills/project-brief/SKILL.md` sirve de referencia de estilo.
3. Valida y prueba:

```bash
npm run check
```

## Que valida el CI

`scripts/validate-skills.mjs` falla si:

- una carpeta de `skills/` no tiene `SKILL.md`;
- falta `name` o `description`, o `name` no coincide con la carpeta;
- la carpeta no esta en kebab-case;
- la `description` supera 500 caracteres.

Ademas avisa (sin fallar) cuando la descripcion no indica cuando usar la
skill, cuando falta la seccion "Cuando usar esta skill" o cuando el archivo
supera 500 lineas.

## Criterios de aceptacion

- **Una skill, un trabajo.** Si el titulo necesita una "y", son dos skills.
- **Instrucciones, no ensayos.** Imperativo, pasos, reglas incumplibles.
- **Al menos un ejemplo concreto**, con entrada y salida esperada.
- **Nada de obviedades** que el agente ya cumple por defecto.
- **Sin secretos** ni rutas internas ni datos personales.

## Estructura del repositorio

```
bin/cli.mjs              punto de entrada del CLI
src/                     nucleo (registro, destinos, AGENTS.md, comandos)
skills/<skill>/SKILL.md  el catalogo
scripts/                 validacion
test/                    pruebas con node:test
```

## Publicar

```bash
npm version <patch|minor|major>
npm publish --access public
git push --follow-tags
```
