let Board = require("./board.js");
let Snake = require("./snake.js");
class Game{
    constructor(data){
        this.turn = data.turn;
        this.board = new Board(data.board);
        this.me = new Snake(data.you);
				this.test = data;
    }
    //todo:
    findFood(){
			let foodLength = Object.keys(this.test.board.food).length;
			let foodArr = this.test.board.food;
			
			let closex = 0;
			let closey = 0;
			let foodDistanceSquare = 99999999999999;
			
			let locx = this.test.you.body[0].x
			let locy = this.test.you.body[0].y
			
			for (let i = 0; i < foodLength; i++) {
				let diffx = foodArr[i].x - locx;
				let diffy = foodArr[i].y - locy;
				
				let temp = (Math.pow(diffx,2) + Math.pow(diffy,2));
				if (temp < foodDistanceSquare){
					foodDistanceSquare = temp;
					closex = foodArr[i].x;
					closey = foodArr[i].y;
				}
			} 
			
			
			
			if(locx < closex){
				return 'right';
			}else if(locx > closex){
				return 'left';
			}else if(locy < closey){
				return 'down';
			}else if(locy > closey){
				return 'up';
			}
			
    }

    /* moves the snake in the given order, this snake is "safe"
    * it will not hunt for food, but it will not hit walls or itself.
     */
    safeMove(){
				if(this.test.you.health < 50) {
					return this.findFood()
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