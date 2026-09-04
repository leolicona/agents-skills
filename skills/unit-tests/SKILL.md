---
name: unit-tests
description: >-
  Escribe pruebas unitarias que fallan cuando el codigo esta mal y siguen las
  convenciones del repositorio. Usala al anadir pruebas, cubrir un bug o
  arreglar una prueba fragil o lenta.
tags: [pruebas, calidad, tdd]
allowed-tools: [Bash, Read, Grep, Glob, Edit, Write]
---

# Pruebas unitarias

## Cuando usar esta skill

- Hay que cubrir codigo nuevo o un bug recien corregido.
- Una prueba es fragil, lenta o no explica que verifica.

## Como trabajar

1. Averigua el framework y las convenciones antes de escribir: mira
   `package.json` / `pyproject.toml` / `go.mod`, y lee dos o tres pruebas
   existentes cercanas al codigo.
2. Copia el estilo del repo (nombres, helpers, fixtures, forma de aserciones).
   No introduzcas una libreria nueva de aserciones.
3. Escribe primero el caso que reproduce el fallo y comprueba que **falla**
   con el codigo roto.
4. Anade los limites: vacio, uno, muchos, invalido, error del dependiente.
5. Ejecuta la suite del area tocada y pega la salida real.

## Reglas

- Una prueba verifica un comportamiento. Si el nombre necesita un "y", parte
  la prueba.
- El nombre describe el comportamiento esperado, no el metodo:
  `devuelve 404 cuando el usuario no existe`, no `test_get_user_2`.
- Estructura Arrange / Act / Assert visible, con una linea en blanco entre
  bloques.
- Nada de `sleep` para sincronizar: usa relojes falsos, esperas por condicion
  o las utilidades async del framework.
- Sin red, sin reloj real, sin aleatoriedad sin semilla, sin orden entre
  pruebas: cada prueba corre sola y en cualquier orden.
- Simula (mock) solo la frontera del sistema: HTTP, disco, hora, cola. No
  simules el objeto que estas probando.
- Afirma sobre el resultado observable, no sobre llamadas internas, salvo
  que el efecto sea precisamente esa llamada.
- Cero aserciones o `assert True` no es una prueba.

## Verificacion obligatoria

Una prueba nueva solo vale si la viste fallar. Antes de darla por buena:

1. Rompe temporalmente el codigo bajo prueba (o revierte el arreglo).
2. Confirma que la prueba falla con un mensaje util.
3. Restaura y confirma que pasa.

## Ejemplo

```js
test('descuenta el stock al confirmar el pedido', async () => {
  const inventario = crearInventario({ 'sku-1': 3 });

  await confirmarPedido({ inventario, lineas: [{ sku: 'sku-1', cantidad: 2 }] });

  assert.equal(inventario.disponible('sku-1'), 1);
});
```

## Antipatrones

- Pruebas que replican la implementacion linea por linea: cambian con cada
  refactor y no detectan nada.
- Un unico `test_todo` de 200 lineas.
- Mockear la base de datos hasta que la prueba solo verifica el mock.
