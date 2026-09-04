---
name: debug-root-cause
description: >-
  Diagnostica un bug hasta su causa raiz con hipotesis verificables antes de
  tocar codigo. Usala ante un error, una prueba que falla, un comportamiento
  intermitente o una regresion en produccion.
tags: [depuracion, diagnostico, incidentes]
allowed-tools: [Bash, Read, Grep, Glob, Edit]
---

# Depuracion hasta la causa raiz

## Cuando usar esta skill

- Algo falla y no se sabe por que.
- Una prueba falla de forma intermitente.
- Hay una regresion tras un despliegue o un merge.

## Como trabajar

1. **Reproduce.** Consigue un comando que falle de forma consistente. Si es
   intermitente, ejecutalo en bucle hasta caracterizar la frecuencia.
2. **Lee el error entero.** El stack trace completo, incluido el `caused by`
   y la primera linea de tu codigo que aparece.
3. **Delimita.** Reduce el caso hasta el minimo que sigue fallando. Bisecta
   por commits (`git bisect`) o por entradas.
4. **Formula una hipotesis falsable.** "Falla porque `X` llega como `null`
   cuando el usuario no tiene perfil." Debe poder refutarse con una
   observacion.
5. **Verifica la hipotesis** con un log, un breakpoint o una asercion
   temporal. Si se refuta, vuelve al paso 4 con lo aprendido.
6. **Corrige la causa, no el sintoma.** Si el arreglo es un `try/catch` o un
   `if (x)` sin explicar por que `x` puede faltar, no has terminado.
7. **Blinda.** Anade la prueba que falla sin el arreglo.
8. **Limpia** los logs y asserts temporales que anadiste.

## Reglas

- No cambies varias cosas a la vez: pierdes la senal de que arreglo funciono.
- "Es un flake" no es un diagnostico. Un test intermitente suele ser una
  carrera real, una dependencia de orden o de reloj.
- Si el bug desaparece al anadir un log, sospecha de temporizacion o
  concurrencia, no de magia.
- Anota lo que descartaste y por que: evita repetir el mismo callejon.
- Antes de culpar a una libreria, lee su codigo o su issue tracker.

## Preguntas que aceleran el diagnostico

- Que cambio entre la ultima vez que funciono y ahora (codigo, datos,
  version, entorno)?
- Falla en todos los entornos o solo en uno? Que se diferencia?
- Falla para todas las entradas o solo para una forma concreta?
- El error viene del proceso que crees, o de otro?

## Entregable

```
Sintoma: <que se observa>
Reproduccion: <comando exacto>
Causa raiz: <mecanismo concreto, con archivo:linea>
Arreglo: <cambio minimo>
Prueba: <la que falla sin el arreglo>
Descartado: <hipotesis refutadas y por que>
```
