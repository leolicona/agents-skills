---
name: code-review
description: >-
  Revisa un diff o un pull request buscando defectos reales de correccion,
  seguridad y mantenibilidad, y reporta cada hallazgo con su escenario de
  fallo. Usala al revisar codigo propio o ajeno antes de integrarlo.
tags: [revision, calidad, pull-request]
allowed-tools: [Bash, Read, Grep, Glob]
---

# Revision de codigo

## Cuando usar esta skill

- Te piden revisar un PR, una rama o los cambios sin commitear.
- Antes de abrir un PR propio, como autorrevision.

## Como trabajar

1. Delimita el cambio: `git diff <base>...HEAD` o el diff del PR.
2. Lee cada archivo tocado **entero**, no solo las lineas del diff: un bug
   suele estar en la interaccion con el codigo que no cambio.
3. Para cada hallazgo, construye un escenario de fallo concreto: entrada o
   estado -> resultado incorrecto. Si no puedes construirlo, no es hallazgo.
4. Verifica antes de reportar: busca el llamador, lee la funcion invocada,
   ejecuta la prueba si existe.
5. Ordena por severidad y reporta.

## Que buscar, en este orden

1. **Correccion**: casos limite (vacio, cero, negativo, null), off-by-one,
   condiciones invertidas, `await` faltante, errores tragados.
2. **Seguridad**: entrada sin validar en consultas o comandos, secretos en
   codigo, autorizacion ausente, datos sensibles en logs.
3. **Concurrencia y recursos**: condiciones de carrera, conexiones o
   ficheros sin cerrar, listeners sin limpiar.
4. **Contratos**: cambios incompatibles en firmas, respuestas o esquemas;
   migraciones sin camino de vuelta.
5. **Pruebas**: la ruta nueva no esta cubierta; la prueba pasa aunque se
   revierta el arreglo.
6. **Mantenibilidad**: duplicacion de logica que ya existe en el repo,
   nombres que mienten, funciones con demasiadas responsabilidades.

## Formato del reporte

Para cada hallazgo:

```
[severidad] archivo:linea - resumen en una frase
Escenario: <entrada o estado concreto> produce <resultado incorrecto>.
Sugerencia: <cambio minimo>
```

Severidades: `bloqueante` (rompe algo o abre un riesgo), `importante`
(deuda que costara caro), `menor` (estilo o pulido).

## Reglas

- No reportes preferencias de estilo si el repo tiene linter o formateador:
  eso lo resuelve la herramienta.
- No pidas comentarios ni docstrings "porque si"; pidelos donde el codigo
  no puede explicar la intencion por si solo.
- Cita siempre `archivo:linea`.
- Si el cambio es correcto, dilo claramente en lugar de inventar hallazgos.
- Distingue lo que verificaste de lo que sospechas; marca lo segundo.

## Antipatrones

- "Podria fallar si..." sin decir con que entrada.
- Reescribir el diseno completo cuando se pidio revisar un cambio pequeno.
- Listar veinte nits y perder el bug real entre ellos.
