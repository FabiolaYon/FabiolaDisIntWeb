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

let scoreBoard = document.querySelector('score-board');

// Actualizar el evento del fantasma para sumar puntos
function spawnGhost() {
    let ghost = document.createElement('div');
    ghost.classList.add('ghost');
    ghost.style.top = Math.random() * 450 + 'px';
    ghost.style.left = Math.random() * 450 + 'px';
    gameContainer.appendChild(ghost);

    ghost.addEventListener('click', () => {
        ghost.remove();
        scoreBoard.updateScore(10);
    });

    setTimeout(() => {
        ghost.remove();
    }, 2000);
}

//Cuando se presione onclick startGame
function startGame() {
    document.getElementById('startScreen').style.display = 'none'; // no se ve
    document.getElementById('gameScreen').style.display = 'block'; // se ve
}
    //llamamos a gameContainer 
    let gameContainer = document.getElementById('gameContainer');

    function spawnGhost() {
        let ghost = document.createElement('div');
        ghost.classList.add('ghost'); // añado fantasma desde css
        //Añadimos fantasmas en posiciones aleatorias 
        ghost.style.top = Math.random() * 450 + 'px';
        ghost.style.left = Math.random() * 450 + 'px';

        gameContainer.appendChild(ghost);

        // El fantasma desaparece a los dos segundos
        setTimeout(() => {
            ghost.remove();
        }, 2000);

        // Al hacer click el fantasma se elimina
        ghost.addEventListener('click', () => {
            ghost.remove();
            console.log("Fantasma atrapado!");
        });
    }

    // Reaparece un fantasma cada dos segundos 
    setInterval(spawnGhost, 2000);

