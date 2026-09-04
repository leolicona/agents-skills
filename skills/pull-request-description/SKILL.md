---
name: pull-request-description
description: >-
  Redacta titulos y descripciones de pull request a partir del diff real,
  respetando la plantilla del repositorio. Usala al abrir un PR o al mejorar
  la descripcion de uno existente.
tags: [pull-request, git, documentacion]
allowed-tools: [Bash, Read, Glob]
---

# Descripcion de pull request

## Cuando usar esta skill

- Vas a abrir un PR.
- Te piden mejorar o completar la descripcion de un PR existente.

## Como trabajar

1. Busca plantilla en `.github/pull_request_template.md`,
   `.github/PULL_REQUEST_TEMPLATE/`, la raiz o `docs/`. Si existe, respeta
   sus secciones tal cual y rellenalas; no inventes secciones nuevas.
2. Lee el cambio completo: `git log <base>..HEAD --oneline` y
   `git diff <base>...HEAD --stat`, luego el diff de los archivos clave.
3. Escribe primero el "por que": que problema resuelve y para quien.
4. Anade como verificarlo con comandos ejecutables.

## Estructura por defecto (si no hay plantilla)

```markdown
## Que cambia
Una o dos frases en presente sobre el efecto observable.

## Por que
El problema o la necesidad. Enlaza el issue si existe.

## Como verificarlo
1. Comandos concretos, copiables.
2. Resultado esperado.

## Notas para quien revisa
Decisiones de diseno, alternativas descartadas, riesgos conocidos.
```

## Titulo

- Mismo estilo que los commits del repo (mira `git log --oneline -20`).
- Describe el resultado, no el proceso: "cachea el catalogo de skills",
  no "cambios en el registry".
- Sin numero de PR, sin "WIP" salvo que realmente lo sea.

## Reglas

- Todo lo que afirmes debe estar en el diff. Si no ejecutaste las pruebas,
  no escribas que pasan.
- Marca explicitamente lo que **no** entra en el PR y queda pendiente.
- Si hay cambios incompatibles, dedicales una seccion con la ruta de
  migracion.
- Nada de credenciales, tokens, rutas internas ni variables de entorno con
  valores reales.
- Capturas o salidas de terminal solo si aclaran algo que el texto no puede.

## Antipatrones

- Enumerar archivo por archivo lo que ya muestra el diff.
- "Varias mejoras y correcciones" como titulo.
- Descripcion generada de la plantilla sin rellenar (`<!-- TODO -->`).
