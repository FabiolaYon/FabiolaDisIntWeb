/* FabiolaAyon_Practica5.js */

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
