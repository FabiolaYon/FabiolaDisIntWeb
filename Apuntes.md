# El juego a realizar será basado en Luigi's Mansion, cazar fantasmas.

## 1
Empiezo con HTML
Separé las tres pantallas: startScreen, gameScreen y endScreen.
Pondré un botón de Pausa y Reanudar en el juego.
Haré un modo daltónico, básico de prueba.
Pondré imágenes de Luigi en cada pantalla para dar más detalle.
Preparé el resto de archivos .css y .js

## 2
Inicio decorando con CSS.
Añado imagen de fondo.
Cambio de letra y color.
Decoración de los botones.

## 3
Ajustando JavaScript para startGame, intercambio de pantallas

## 4
Inserto imagen en botón.
Edición con CSS del game Container
Al pasar el mouse sobre el fantasma este crece un poquito
Añado imagen de fantasma Boo.webp
Aparece el fantasma en posiciones aleatorias y cada dos segundos.

## 5
Web component, score-borad .
Encapsulo el marcador para ser reutilizado.
La puntuación aumenta en 10 puntos.
Le damos diseño dentro del ShadowDom > attachshadow > shadowRoot.

## 6 
Si el fantasma no es capturado a tiempo.
spawnGhost detecta si el fantasma se captura o no.
Mostrar endScreen si pierdes.
Utilizo gameOver para finalizar el juego. 
Proceso...

## 7 
Agrego pausa al juego, botonPausa.

## 8 
Modo daltonico, básico, proceso de cambio puntero a color naranja.
Agrego botones y proceso de pantallas para ver no ver, .css y .js.

## 9 
Capturar fantasmas con ghostTimeout. 
Ponemos "susto" con el css, se debe agrandar la imagen con @keyframes.