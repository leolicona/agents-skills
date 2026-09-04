---
name: project-brief
description: >-
  Entrevista al usuario por rondas de preguntas y redacta con sus respuestas
  un brief de proyecto en Markdown. Usala cuando pidan crear, arrancar o
  completar un brief, un project brief o un documento de arranque de
  proyecto.
tags: [producto, descubrimiento, entrevista, documentacion]
allowed-tools: [Read, Write, Edit, Glob, Grep]
---

# Brief de proyecto

## Cuando usar esta skill

- "Hazme un brief", "arranquemos el proyecto X", "necesito un documento de
  arranque", "project brief".
- Hay un brief a medias y hay que completarlo o actualizarlo.

No la uses para una especificacion tecnica ni un plan de implementacion: el
brief responde **que** y **por que**, no **como**.

## Como trabajar

1. **Lee antes de preguntar.** Revisa README, `docs/`, issues abiertas y
   briefs previos. Nunca gastes una pregunta en algo que ya esta escrito;
   en su lugar confirma: "veo que el stack es X, sigue siendo asi?".
2. **Entrevista por rondas.** Maximo 3 preguntas por turno, numeradas y en
   lenguaje llano. Nada de cuestionarios de veinte puntos.
3. **Refleja y confirma.** Cierra cada ronda resumiendo en una o dos frases
   lo que entendiste y pide correccion antes de avanzar.
4. **Persigue lo vago.** "Rapido", "escalable", "mejor experiencia" no son
   respuestas: pide un numero, un plazo, un ejemplo concreto o el caso real
   que lo motiva.
5. **Registra los huecos.** Si la respuesta es "no se" o "ya veremos", no
   inventes: va tal cual a *Preguntas abiertas*.
6. **Redacta** con la plantilla de abajo y **guarda** en
   `docs/briefs/<slug>.md` (o donde el repo ya guarde documentos).
7. **Entrega** diciendo la ruta del archivo y listando lo que quedo abierto.

## Rondas de la entrevista

Adapta las preguntas al contexto; el orden importa porque cada ronda apoya
la siguiente.

**1. Problema y contexto**
- Que problema resuelve este proyecto y de quien es ese problema?
- Que pasa hoy sin esto? Como se resuelve por ahora?
- Por que ahora y no el trimestre que viene?

**2. Usuarios y uso**
- Quien lo va a usar, y con que frecuencia?
- Cuentame el recorrido principal, de principio a fin.
- Que otros actores se ven afectados (soporte, ventas, legal, operaciones)?

**3. Alcance**
- Que tiene que existir si o si en la primera version utilizable?
- Que dejamos fuera a proposito, aunque suene tentador?
- Hay algo que ya exista y se pueda reutilizar en lugar de construir?

**4. Exito**
- Como sabremos, en numeros, que funciono?
- Cual es el umbral que separa exito de fracaso, y en que plazo?
- Con que dato se mide hoy eso, y si no existe, quien lo instrumenta?

**5. Restricciones**
- Fecha limite real y de donde sale esa fecha.
- Quien trabaja en esto y con cuanta dedicacion.
- Tecnologia, proveedores o procesos obligatorios; presupuesto; requisitos
  legales o de privacidad.

**6. Riesgos y supuestos**
- Que podria hundir el proyecto?
- Que estamos dando por hecho sin haberlo comprobado?
- De quien dependemos y que pasa si esa dependencia se retrasa?

## Plantilla del brief

```markdown
# Brief: <nombre del proyecto>

Estado: borrador | revisado | aprobado
Fecha: AAAA-MM-DD
Responsable: <nombre>

## Resumen en una frase
<Que se va a hacer, para quien y para lograr que.>

## Problema
<Situacion actual, a quien le duele y que cuesta hoy.>

## Usuarios y necesidad
<Perfiles principales y el recorrido que deben poder completar.>

## Objetivos
1. <Cambio observable, no funcionalidad.>

## Fuera de alcance
- <Lo que explicitamente no se hace en esta version.>

## Metricas de exito
| Metrica | Umbral | Plazo | Como se mide |
| --- | --- | --- | --- |

## Restricciones
<Plazo, equipo, presupuesto, tecnologia obligada, legal.>

## Riesgos y supuestos
| Riesgo o supuesto | Impacto | Como lo reducimos |
| --- | --- | --- |

## Hitos
| Hito | Fecha objetivo | Que demuestra |
| --- | --- | --- |

## Preguntas abiertas
- [ ] <Pregunta sin responder> — responsable: <quien> 

## Decisiones tomadas
| Fecha | Decision | Por que | Alternativa descartada |
| --- | --- | --- | --- |
```

## Reglas

- **Nunca inventes contenido.** Todo lo que no dijo el usuario va a
  *Preguntas abiertas*, no a un parrafo plausible.
- **Maximo 3 preguntas por turno**, y para en cuanto tengas lo necesario:
  una entrevista larga se abandona a la mitad.
- **Un objetivo no es una funcionalidad.** "Login con Google" es un medio;
  "reducir el abandono en el registro del 40% al 20%" es un objetivo.
- **Cada objetivo lleva metrica, umbral y plazo.** Si algo no se puede
  medir hoy, escribelo asi en lugar de fingir una metrica.
- **El brief cabe en dos paginas.** El detalle tecnico va a otro documento
  enlazado desde aqui.
- **Confirma antes de escribir el archivo** y muestra la ruta al terminar.
- Si el usuario quiere cortar la entrevista, redacta el brief con lo que
  haya y deja el resto marcado como abierto: un brief parcial y honesto
  sirve; uno completo e inventado, no.
- Escribe el brief en el idioma en que te hablo el usuario.

## Ejemplo

Respuesta vaga del usuario y como repreguntar:

```text
Usuario: Queremos que la app sea mas rapida.
Agente:  Para poder medirlo: que pantalla se siente lenta hoy, cuanto tarda
         ahora y en cuanto seria aceptable? Si no tienes el numero a mano,
         lo dejo como pregunta abierta.
```

Objetivo mal y bien escrito:

```text
Mal:  Mejorar la experiencia del checkout.
Bien: Bajar el abandono del checkout del 38% al 25% antes del 30 de junio,
      medido con el embudo de analitica que ya registra `checkout_started`
      y `order_placed`.
```
