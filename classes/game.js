let Board = require("./board.js");
let Snake = require("./snake.js");
class Game{
    constructor(data){
        this.turn = data.turn;
        this.board = new Board(data.board);
        this.me = new Snake(data.you);
    }
    //todo:
    findFood(){
		let foodLength = this.board.food.length;
		let foodArr = this.board.food;
		
		let closeFoodX = 0;
		let closeFoodY = 0;
		let foodDistanceSquare = 99999999999999;
		
		let headX = this.me.head.x;
		let headY = this.me.head.y;
		
		foodArr.forEach(function(food){
			let diffx = food.x - headX;
			let diffy = food.y - headY;
			
			let temp = (Math.pow(diffx,2) + Math.pow(diffy,2));
			if (temp < foodDistanceSquare){
				foodDistanceSquare = temp;
				closeFoodX = food.x;
				closeFoodY = food.y;
			}
		}); 
		
		if(headX < closeFoodX){//right
			
			if(this.board.searchRight(this.me.head)){
				return "right";
			} else if(this.board.searchDown(this.me.head)){
				return "down";
			} else if(this.board.searchUp(this.me.head)){
				return "up";
			} else if(this.board.searchLeft(this.me.head)){
				return "left";
			}
			
		}else if(headX > closeFoodX){//left
		
			if(this.board.searchLeft(this.me.head)){
				return "left";
			} else if(this.board.searchDown(this.me.head)){
				return "down";
			} else if(this.board.searchUp(this.me.head)){
				return "up";
			} else if(this.board.searchRight(this.me.head)){
				return "right";
			}
			
		}else if(headY < closeFoodY){//down
		
			if(this.board.searchDown(this.me.head)){
				return "down";
			} else if(this.board.searchRight(this.me.head)){
				return "right";
			} else if(this.board.searchLeft(this.me.head)){
				return "left";
			} else if(this.board.searchUp(this.me.head)){
				return "up";
			} else {
				return "up";
			}
			
		}else if(headY > closeFoodY){//up
			
			if(this.board.searchUp(this.me.head)){
				return "up";
			} else if(this.board.searchRight(this.me.head)){
				return "right";
			} else if(this.board.searchLeft(this.me.head)){
				return "left";
			} else if(this.board.searchDown(this.me.head)){
				return "down";
			}
		}
		
		return "up";
		
		
    }

    /* moves the snake in the given order, this snake is "safe"
    * it will not hunt for food, but it will not hit walls or itself.
     */
    safeMove(){
		if(this.me.health < 50) {
			return this.findFood();
		}
	
		if(this.board.searchUp(this.me.head)){
			return "up";
		} else if(this.board.searchDown(this.me.head)){
			return "down";
		} else if(this.board.searchRight(this.me.head)){
			return "right";
		} else if(this.board.searchLeft(this.me.head)){
			return "left";
		} else {
			return "up";
		}

    }

    /* this is the order in which our snake will do things, for example if we want it
    * to do safeMove until it needs food we need to add a case for that like if
    * health < whatever then get food, otherwise do safe move
     */
    getMove(){
        return this.safeMove();
    }
}
module.exports = Game;