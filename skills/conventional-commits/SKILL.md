---
name: conventional-commits
description: >-
  Escribe mensajes de commit siguiendo Conventional Commits a partir de los
  cambios reales del staging area. Usala cuando haya que crear un commit,
  reescribir un mensaje de commit o preparar una serie de commits atomicos.
tags: [git, commits, convenciones]
allowed-tools: [Bash, Read, Grep]
---

# Conventional Commits

## Cuando usar esta skill

- Te piden hacer un commit, "guardar los cambios" o "subir esto".
- Hay que reescribir o mejorar un mensaje de commit existente.
- Un diff grande debe partirse en varios commits.

## Como trabajar

1. Lee el cambio real antes de escribir nada: `git status --short` y
   `git diff --staged` (o `git diff` si no hay nada en staging).
2. Identifica **un** proposito dominante. Si hay dos propositos sin relacion,
   propone dos commits y separa con `git add -p`.
3. Elige el tipo segun el efecto en el usuario del codigo, no segun los
   archivos tocados.
4. Escribe el asunto y, solo si aporta, el cuerpo.
5. Muestra el mensaje antes de ejecutar `git commit`.

## Formato

```
<tipo>(<ambito opcional>): <asunto en imperativo>

<cuerpo opcional: por que, no que>

<footer opcional: BREAKING CHANGE / refs>
```

## Tipos

| Tipo | Usalo cuando |
| --- | --- |
| `feat` | Anade capacidad visible para quien consume el codigo |
| `fix` | Corrige un comportamiento incorrecto |
| `refactor` | Cambia estructura sin cambiar comportamiento |
| `perf` | Mejora rendimiento sin cambiar la API |
| `test` | Solo anade o corrige pruebas |
| `docs` | Solo documentacion |
| `build` | Dependencias, empaquetado, tooling de build |
| `ci` | Pipelines y automatizacion de CI |
| `chore` | Mantenimiento que no encaja arriba |

## Reglas

- Asunto en imperativo y en minuscula: "agrega", no "agregado" ni "Agrega".
- Maximo 72 caracteres en el asunto, sin punto final.
- El cuerpo explica **por que** y que alternativa se descarto; el diff ya
  dice que cambio.
- Envuelve el cuerpo a 72 columnas.
- Un cambio incompatible lleva `!` tras el tipo y un footer
  `BREAKING CHANGE: <que se rompe y como migrar>`.
- No inventes numeros de issue: solo referencialos si aparecen en la rama,
  en el contexto de la tarea o te los dio el usuario.
- Nunca uses `git commit -A` a ciegas: revisa antes que se esta incluyendo.

## Ejemplos

Cambio simple:

```
fix(auth): renueva el token antes de que expire

El cliente reintentaba con un token caducado y el backend devolvia 401
en la primera peticion tras 15 minutos de inactividad. Ahora se refresca
60 segundos antes del vencimiento.
```

Cambio incompatible:

```
feat(api)!: devuelve 404 en lugar de 200 con body vacio

BREAKING CHANGE: `GET /users/:id` ya no responde 200 con `null` cuando el
usuario no existe. Los clientes deben tratar el 404 como "no encontrado".
```

## Antipatrones

- `chore: cambios varios` — no dice nada; parte el commit.
- `fix: bug` — no identifica el sintoma corregido.
- Mezclar formateo automatico con logica en el mismo commit.
