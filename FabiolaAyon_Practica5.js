/* FabiolaAyon_Practica5.js */

//Puntuación
/* Componente web */
class ScoreBoard extends HTMLElement {
    constructor() {
        super(); // Permite heredar funcionalidad de ScoreBoard
        this.attachShadow({ mode: 'open' }); //Crea un ShadowDom para encapsular HTML y CSS dentro del componente sin afecta el resto del codigo
        this.score = 0;

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
}

customElements.define('score-board', ScoreBoard); //Nos permite crear un HTML personalizado

const scoreBoard = document.querySelector('score-board');
const gameContainer = document.getElementById('gameContainer');

let gamePaused = false;

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

// Modificación en spawnGhost
function spawnGhost() {
    if (gamePaused) return; //si se pausa no genero fantasma

    let ghost = document.createElement('div');
    ghost.classList.add('ghost');
    ghost.style.top = Math.random() * 450 + 'px';
    ghost.style.left = Math.random() * 450 + 'px';
    gameContainer.appendChild(ghost);

    let ghostTimeout = setTimeout(() => {
        ghost.remove();
        gameOver();
    }, 2000);

    ghost.addEventListener('click', () => {
        clearTimeout(ghostTimeout);
        ghost.remove();
        scoreBoard.updateScore(10);
    });
}

let gameInterval = setInterval(spawnGhost, 2000);

//Cuando se presione onclick startGame
function startGame() {
    document.getElementById('startScreen').style.display = 'none'; // no se ve
    document.getElementById('gameScreen').style.display = 'block'; // se ve

    gameInterval = setInterval(spawnGhost, 2000);
}

// Función para finalizar el juego
function gameOver() {
    clearInterval(gameInterval);
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('endScreen').style.display = 'block';
} 