class Game {
    constructor () {
    	this.board = new Board;
    	this.players = this.createPlayers();
    	this.ready = false;
    }

    get activePlayer() {
    	return this.players.find(player => player.active);
	}

 /** 
 * Creates two player objects
 * @return  {Array}    An array of two Player objects.
 */

    createPlayers() {
    	const players = [new Player('Player 1', 1, '#e15258', true),
    	new Player('Player 2', 2, '#e59a13')];

    	return players;
    }

    // Gets game ready for play

    startGame() {
		this.board.drawHTMLBoard();
		this.activePlayer.activeToken.drawHTMLToken();
		this.ready = true;
    }

    /**
 * Branches code, depending on what key player presses
 * @param   {Object}    e - Keydown event object
 */

    handleKeydown(e) {
    	if (this.ready) {
    		if(e.key === 'ArrowLeft') {
    			this.activePlayer.activeToken.moveLeft();
    		} else if (e.key === 'ArrowRight') {
    			this.activePlayer.activeToken.moveRight(this.board.columns);
    		} else if (e.key === "ArrowDown"){
    			this.playToken();
    		}
    	}
    }

    playToken() {
    	let spaces = this.board.spaces;
    	let activeToken = this.activePlayer.activeToken;
    	let targetColumn = spaces[activeToken.columnLocation];
    	let targetSpace = null;

    	for (let space of targetColumn) {
    		if(space.token === null) {
    			targetSpace = space;
    		}
    	}

    	if (targetSpace !== null) {
    		const game = this;
    		game.ready = false;
    		activeToken.drop(targetSpace, function() {
    			game.upadateGameState(activeToken, targetSpace);
    		});
    	}
    }

    checkForWin(target){
        const owner = target.token.owner;
        let win = false;

        // vertical
        for (let x = 0; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x][y+1].owner === owner && 
                    this.board.spaces[x][y+2].owner === owner && 
                    this.board.spaces[x][y+3].owner === owner) {
                        win = true;
                }           
            }
        }

        // horizontal
        for (let x = 0; x < this.board.columns - 3; x++ ){
            for (let y = 0; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x+1][y].owner === owner && 
                    this.board.spaces[x+2][y].owner === owner && 
                    this.board.spaces[x+3][y].owner === owner) {
                        win = true;
                }           
            }
        }

        // diagonal
        for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x-1][y+1].owner === owner && 
                    this.board.spaces[x-2][y+2].owner === owner && 
                    this.board.spaces[x-3][y+3].owner === owner) {
                        win = true;
                }           
            }
        }

        // diagonal
        for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 3; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x-1][y-1].owner === owner && 
                    this.board.spaces[x-2][y-2].owner === owner && 
                    this.board.spaces[x-3][y-3].owner === owner) {
                        win = true;
                }           
            }
        }

        return win;
    }

    // Switches Active Player

    switchPlayers() {
    	for (let player of this.players) {
    		player.active = player.active === true ? false : true;
    	}
    }

    /** 
 * Displays game over message.
 * @param {string} message - Game over message.      
 */

    gameOver(message) {
    	let gameOver = document.getElementById('game-over');
    	gameOver.style.display = 'block';
    	gameOver.textContent = message;
    }

    /** 
 * Updates game state after token is dropped. 
 * @param   {Object}  token  -  The token that's being dropped.
 * @param   {Object}  target -  Targeted space for dropped token.
 */

    upadateGameState(token, target) {
    	target.mark(token);

    	if (!this.checkForWin(target)) {

    		this.switchPlayers();

    		if (this.activePlayer.checkTokens()) {
    			this.activePlayer.activeToken.drawHTMLToken();
    			this.ready = true;
    		} else {
    			this.gameOver('No More Tokens!')
    		}
    	} else {
    		this.gameOver(`${target.owner.name} wins!`);
    	}
    }
}