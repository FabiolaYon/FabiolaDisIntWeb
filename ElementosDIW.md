# Localización de elementos:

## setTimeout

Se utiliza para ir eliminando los fantasmas e ir a gameOver.

## clearTimeout

Al hacer click en el fantasma se va a elimina junto a su temporizador anterior de setTimeout.

## setInterval

Lo utilizo para insertar un tiempo para que vayan apareciendo los fantasmas en spawnGhost

## clearInterval

En el gameOver detiene la aparición de los fantasmas.

## requestAnimationFrame

Lo utilizo como "accesibilidad" para el usuario. Utilizo el modo daltónico aplicando el cambio de color en style (cambiarColorPuntero), cambia a un tono naranja más visible para el usuario "daltónico".

## cancelAnimationFrame

Se cancela volviendo al estado original el puntero, es amarillo.

## Promesa

Lo utilizo para controlar el tiempo y lugar de aparición de los fantasmas (dentro de este se encuentra el setTimeout y clearTimeout), aperecen en un lugar aleatorio del <div> 

## "async/await"

En startGame asegura que el juego espere a que el fantasma aparezca para poder continuar

## Componente web

Mi componente web sería <score-board></score-board>, en un Shadow DOM y guarda y actualiza la puntuación automáticamente en un localStorage y no depende de otros elementos de HTML y se puede modificar de forma externa.
