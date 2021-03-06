const game = new Game();

/** 
 * Listens for click on `#begin-game` and calls startGame() on game object
 */

document.querySelector('#begin-game').addEventListener('click', function(){
	game.startGame();
	this.style.display = 'none';
	document.getElementById('play-area').style.opacity = '1';
});

	//Listens for Keyboard Presses

	document.addEventListener('keydown', function(event) {
		game.handleKeydown(event);
});