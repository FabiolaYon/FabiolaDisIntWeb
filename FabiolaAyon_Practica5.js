/* FabiolaAyon_Practica5.js */

//Puntuación
/* Componente web */
class ScoreBoard extends HTMLElement {
    constructor() {
        super(); // Permite heredar funcionalidad de ScoreBoard
        this.attachShadow({ mode: 'open' }); //Crea un ShadowDom para encapsular HTML y CSS dentro del componente sin afecta el resto del documento
        this.score = 0;

        if (localStorage.getItem('highScore') !== null) { //Verifica si hay un score máximo guardado o no
            this.highScore = parseInt(localStorage.getItem('highScore')); //Si existe recupera el score maximo
        } else { //Sino, inicia en 0
            this.highScore = 0;
        }

        this.shadowRoot.innerHTML = //Diseño del marcador
            "<style>" +
            "div {" +
            "font-size: 20px;" +
            "background: black;" +
            "padding: 10px;" +
            "border: 2px solid white;" +
            "color: white;" +
            "border-radius: 5px;" +
            "}" +
            "</style>" +

            "<div part='score-container'>" +
            "Puntuación: <span id='score'>0</span><br>" + // Muestra la puntuación de 0, la actual
            "Récord: <span id='highScore'>" + this.highScore + "</span>" + // Muestra el récord
            "</div>";
    }

    //Actualizar puntos
    updateScore(points) {
        this.score = this.score + points; //Suma los puntos al marcador
        this.shadowRoot.querySelector('#score').textContent = this.score; //Actualiza los puntos en la pantalla

        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.shadowRoot.querySelector('#highScore').textContent = this.highScore;
            localStorage.setItem('highScore', this.highScore);
        } //Si la nueva puntuación es mayor que el récord se actualiza y guarda en localStorage
    }

    resetScore() {
        this.score = 0; //Actualiza la puntuación en 0, para restarGame (más abajo)
        this.shadowRoot.querySelector('#score').textContent = this.score; //Actualiza la interfaz
    }
}

customElements.define('score-board', ScoreBoard); //Nos permite crear un HTML personalizado


let gameContainer = document.getElementById('gameContainer'); // Juego
let ghostTimeouts = []; // Guardamos el temporizador de los fantasmas
let gameInterval; // Intervalo de aparicion de los fantasmas
let gameActive = false; // juego está activo
let gamePaused = false; // juego está en pausa
let scoreBoard; // puntuacion
let pointer = document.getElementById('pointer'); // editar puntero
let pauseButton = document.getElementById('pauseButton'); // pausar/reanudar
let colorModoDaltonico = false; // modo daltónico o no
let colorBlindAnimation; // animacion de color modo daltonico

/*
Esta parte es para saber en qué posición se encuentra el fantasma.
Recoger las coordinada del mouse en proporción a la pantalla
*/
document.addEventListener('mousemove', function (e) {
    pointer.style.left = e.pageX + "px";
    pointer.style.top = e.pageY + "px";
});

/*
Inicio del juego
Oculta la pantalla de inicio
Activa el juego con el true
Activa el marcador de puntos
*/

async function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    gameActive = true;
    gamePaused = false;
    pauseButton.textContent = "Pausar";
    scoreBoard = document.querySelector('score-board');

    if (!scoreBoard) {
        console.error("No funciona la pantalla de Score");
        return;
    }

    gameInterval = setInterval(async () => { 
        if (!gamePaused) {
            try {
                await spawnGhost(); 
            } catch (error) {
                console.error("¡Te pillaron! ¿Jugar de nuevo?", error);
                gameOver();
            }
        }
    }, 2000);
}

function botonPausa() {
    if (!gameActive) return;

    if (gamePaused === true) {
        gamePaused = false; // Reanuda el juego
    } else {
        gamePaused = true; // Pausa el juego
    }

    if (gamePaused === true) {
        pauseButton.textContent = "Reanudar";
    } else {
        pauseButton.textContent = "Pausar";
    }

    if (gamePaused) {
        ghostTimeouts.forEach(timeout => clearTimeout(timeout));
    } else {
        setTimeout(() => {
            // Reanuda el juego después de un segundo
        }, 1000);
    }
}

function modoDaltonico() {
    if (colorModoDaltonico === true) {
        colorModoDaltonico = false; //activa modo daltonico
    } else {
        colorModoDaltonico = true; //desactiva modo daltonico
    }

    /*
    requestAnimationFrame
    */

    // con requestAnimationFrame solicitamos el cambio del color del puntero
    // con cancelAnimationFrame vuelve al color original
    if (colorModoDaltonico) {
        colorBlindAnimation = requestAnimationFrame(cambiarColorPuntero);
    } else {
        /*
        cancelAnimationFrame
        */
        cancelAnimationFrame(colorBlindAnimation);
        pointer.style.background = "radial-gradient(circle, rgba(255, 255, 0, 0.8) 10%, rgba(0, 0, 0, 0) 70%)";
    }
}

function cambiarColorPuntero() {
    if (colorModoDaltonico) {
        pointer.style.background = "radial-gradient(circle, #ff6600 10%, rgba(0, 0, 0, 0) 70%)";
        colorBlindAnimation = requestAnimationFrame(cambiarColorPuntero);
    }
}

// Aparición de fantasma
function spawnGhost() {
    // Devuelve una promesa que controla el tiempo de aparición de cada fantasma
    /*
    Promise
    */
    return new Promise((resolve, reject) => {
        // Al terminar la función se detiene
        if (gameActive === false || gamePaused === true) {
            resolve("Ya no salen más fantasmas, fin.");
            return;
        }

        // Creaciones de fantasmas, lo coloca en una posición aleatoria dentro del div gameContainer
        let ghost = document.createElement('div');
        ghost.classList.add('ghost');
        ghost.style.top = Math.random() * 450 + 'px';
        ghost.style.left = Math.random() * 450 + 'px';
        // Traemos el id gameContainer del html asociándolo con ghost
        gameContainer.appendChild(ghost);

        /*
        setTimeout
        */

        // Si no lo atrapas, el fantasma se agranda (animación "susto") y el juego termina
        let ghostTimeout = setTimeout(() => {
            if (!gamePaused) {
                try {
                    ghost.classList.add('susto');
                    setTimeout(() => {
                        ghost.remove();
                        gameOver();
                        reject("restartGame");
                    }, 500);
                } catch (error) {
                    console.error("Error al aplicar @keyframe susto:", error);
                    reject(error);
                }
            }
        }, 2000);

        ghostTimeouts.push(ghostTimeout);

        /*
        clearTimeout
        */

        // Al hacer click sobre el fantasma
        ghost.addEventListener('click', () => {
            try {
                clearTimeout(ghostTimeout);
                // Se suma 10 puntos al marcador
                scoreBoard.updateScore(10);
                // El fantasma se elimina y el temporizador se detiene
                ghost.remove();
                resolve("Fantasma atrapado");
            } catch (error) {
                console.error("¡Has perdido!", error);
                reject(error);
            }
        });
    });
}

//Fin del juego
function gameOver() {
    gameActive = false;
    /*
    clearInterval
    */
    clearInterval(gameInterval); //Detiene la aparición de fantasmas
    ghostTimeouts.forEach(timeout => clearTimeout(timeout));
    ghostTimeouts = []; //Elimina todos los fantasmas
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('endScreen').style.display = 'block'; //muestra la pantalla endScreen
}

//Reinicia el juego
function restartGame() {
    document.getElementById('endScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'block';
    if (scoreBoard) {
        scoreBoard.resetScore(); // resetea a 0 el score
    }
}