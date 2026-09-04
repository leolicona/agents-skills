---
name: safe-refactor
description: >-
  Reestructura codigo en pasos pequenos y verificables sin cambiar el
  comportamiento observable. Usala al limpiar, extraer, renombrar o dividir
  codigo existente, o antes de anadir una funcionalidad a codigo enredado.
tags: [refactor, mantenibilidad, diseno]
allowed-tools: [Bash, Read, Grep, Glob, Edit, Write]
---

# Refactor seguro

## Cuando usar esta skill

- Te piden limpiar, simplificar o reorganizar codigo existente.
- Necesitas preparar el terreno antes de anadir una funcionalidad.

## Regla fundamental

Refactor = el comportamiento observable no cambia. Si cambia, es un cambio
de funcionalidad y va en un commit aparte, con su descripcion propia.

## Como trabajar

1. **Red de seguridad primero.** Ejecuta las pruebas y guarda la salida. Si
   el area no tiene pruebas, escribe primero pruebas de caracterizacion que
   fijen el comportamiento actual, aunque sea raro.
2. **Un movimiento a la vez.** Extraer funcion, renombrar, invertir una
   condicion, mover un archivo. Cada paso compila y pasa las pruebas.
3. **Ejecuta las pruebas tras cada paso**, no al final.
4. **Commit por paso** cuando el refactor es largo: revertir uno debe ser
   trivial.
5. **Compara al terminar**: misma salida para las mismas entradas.

## Reglas

- No mezcles movimiento de archivos con cambios de contenido en el mismo
  commit: el diff se vuelve ilegible. Mueve primero, edita despues.
- Respeta las convenciones existentes del repo aunque no sean tus favoritas.
- No "mejores" de paso APIs publicas ni firmas exportadas sin decirlo.
- Elimina el codigo muerto en lugar de comentarlo; el historial ya lo guarda.
- Si un formateador automatico toca 500 lineas, ese formateo va en su propio
  commit.
- Para cuando el objetivo se cumpla. Un refactor sin criterio de parada se
  convierte en una reescritura.

## Movimientos utiles

| Sintoma | Movimiento |
| --- | --- |
| Funcion larga con bloques comentados por seccion | Extraer funcion por bloque |
| Mismo bloque en tres sitios | Extraer y reusar, si de verdad es el mismo concepto |
| Muchos booleanos por parametro | Sustituir por objeto de opciones o funciones distintas |
| Condicionales anidados profundos | Clausulas de guarda y retorno temprano |
| Nombre que miente | Renombrar en todo el repo con la herramienta del editor |

## Antipatrones

- Deduplicar dos fragmentos parecidos que evolucionan por razones distintas:
  acoplas dos conceptos.
- Introducir una abstraccion con un solo uso "por si acaso".
- Refactor y arreglo de bug en el mismo commit.
