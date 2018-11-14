class Token {
    constructor(index, owner){
        this.owner = owner;
        this.id = `token-${index}-${owner.id}`;
        this.dropped = false;
        this.columnLocation = 0;
    }

    get htmlToken() {
        return document.getElementById(this.id);
    }

    /** 
     * Gets left offset of html element.
     * @return  {number}   Left offset of token object's htmlToken.
     */

    get offsetLeft() {
        return this.htmlToken.offsetLeft;
    }

    // Draws new HTML token

    drawHTMLToken() {
    	let tokenDiv = document.createElement('div');
    	let gameBoardUnderlay = document.querySelector('#game-board-underlay');
    	gameBoardUnderlay.appendChild(tokenDiv);
    	tokenDiv.setAttribute('id', this.id);
    	tokenDiv.setAttribute('class', 'token');
    	tokenDiv.style.backgroundColor = this.owner.color;
    }

    moveLeft() {
        if (this.columnLocation > 0) {
            this.htmlToken.style.left = this.offsetLeft - 76;
            this.columnLocation--;
        }
    }

    moveRight(columns) {
        if (this.columnLocation < columns - 1) {
            this.htmlToken.style.left = this.offsetLeft + 76;
            this.columnLocation++;
        }
    }

    drop(target, reset) {
        this.dropped = true;

        $(this.htmlToken).animate({
            top: (target.y * target.diameter)
        }, 750, 'easeOutBounce', reset);
    }
}