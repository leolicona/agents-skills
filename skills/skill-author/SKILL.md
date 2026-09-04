---
name: skill-author
description: >-
  Escribe y revisa archivos SKILL.md para agentes de IA: frontmatter valido,
  descripcion que dispara la skill en el momento correcto e instrucciones
  accionables. Usala al crear, editar o auditar una skill.
tags: [skills, meta, documentacion, agentes]
allowed-tools: [Read, Write, Edit, Grep, Glob]
---

# Como escribir una SKILL.md

## Cuando usar esta skill

- Vas a crear una skill nueva.
- Una skill existente no se activa cuando deberia, o se activa de mas.
- Hay que revisar una skill antes de publicarla en un catalogo.

## Anatomia

```markdown
---
name: kebab-case-en-minusculas
description: >-
  Que hace la skill Y cuando debe usarla el agente, en la misma frase.
tags: [ambito, tema]
allowed-tools: [Read, Bash]
---

# Titulo

## Cuando usar esta skill
## Como trabajar
## Reglas
## Ejemplo
```

## La descripcion es lo mas importante

El agente normalmente solo ve `name` y `description` hasta que decide abrir
la skill. La descripcion es el disparador, no un resumen de marketing.

- Incluye **que hace** y **cuando usarla**: "Usala cuando...".
- Usa las palabras que aparecerian en la peticion real del usuario.
- Se especifica: "revisa un diff buscando bugs de correccion y seguridad"
  dispara mejor que "ayuda con la calidad del codigo".
- Manten menos de ~500 caracteres.
- Delimita tambien cuando **no** aplica, si la skill se confunde con otra.

Malo: `description: Ayuda con git.`
Bueno: `description: Escribe mensajes de commit siguiendo Conventional
Commits a partir del diff en staging. Usala al crear un commit o reescribir
un mensaje.`

## Reglas para el cuerpo

- Escribe instrucciones, no ensayos: imperativo, pasos numerados, listas.
- Cada regla debe poder incumplirse: si nadie puede desobedecerla, sobra.
- Incluye al menos un ejemplo concreto de entrada y salida esperada.
- Un ejemplo de lo que **no** hacer vale mas que tres parrafos de teoria.
- Da comandos ejecutables, no descripciones de comandos.
- Manten el archivo por debajo de ~500 lineas. Lo extenso va en
  `references/` y se enlaza desde el cuerpo.
- No repitas lo que el agente ya hace por defecto ("se cuidadoso",
  "escribe buen codigo"): gasta contexto y no cambia nada.
- Una skill, un trabajo. Si el titulo necesita una "y", son dos skills.

## Estructura de la carpeta

```
mi-skill/
  SKILL.md          # obligatorio
  references/       # documentacion larga que se lee bajo demanda
  scripts/          # utilidades ejecutables
  assets/           # plantillas, ejemplos
```

## Lista de verificacion antes de publicar

- [ ] `name` en kebab-case y coincide con el nombre de la carpeta.
- [ ] `description` dice que hace y cuando usarla, en una frase.
- [ ] El cuerpo empieza por "Cuando usar esta skill".
- [ ] Todas las instrucciones son accionables y verificables.
- [ ] Hay al menos un ejemplo real.
- [ ] Ningun secreto, ruta interna ni dato personal.
- [ ] Se lee entera en menos de dos minutos.

## Como probarla

1. Formula tres peticiones que **deberian** activarla y comprueba que la
   descripcion las cubre.
2. Formula dos que **no** deberian activarla y comprueba que no encajan.
3. Dale la skill a un agente sin mas contexto y mira si el resultado cambia
   respecto a no tenerla. Si no cambia, la skill no aporta.
