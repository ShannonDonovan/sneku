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
      
			let foodx = request.body.board.food[0].x
			let foody = request.body.board.food[0].y
			
			let locx = request.body.you.body[0].x
			let locy = request.body.you.body[0].y
			
			if(locx < foodx){
				data.move = 'right';
			}else if(locx > foodx){
				data.move = 'left';
			}else if(locy < foody){
				data.move = 'down';
			}else if(locy > foody){
				data.move = 'up';
			}
    }
    
    /*
     * Return a move to turtle the snake around in a circle 
     */
    turtle() {
        // Compare the coord of the head to the coord of the next segment to figure out how the snake just moved
        const diff = this.me.head.subtract(this.me.body[1]);
        // It should go down half its length, then turn around and go back
        // So check that its done that
        if (diff.x == 0) {
            let i = 1;
            // Fancy way to check how long the snake's gone without turning
            while (i < this.me.length() && this.me.body[i - 1].subtract(this.me.body[i]).distanceTo(diff) == 0) {
                i++;
            }
            if (i < this.me.length() / 2) {
                // Continue going straight
                if (diff.x == 1) {
                    return "right";
                } else if (diff.x == -1) {
                    return "left";
                } else if (diff.y == 1) {
                    return "down";
                } else {
                    return "up";
                }
            }
        }
        if (diff.x == 1) {
            return "up";
        } else if (diff.x == -1) {
            return "down";
        } else if (diff.y == 1) {
            return "right";
        } else {
            return "left";
        }
    }

    /* moves the snake in the given order, this snake is "safe"
    * it will not hunt for food, but it will not hit walls or itself.
     */
    safeMove(){
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
        return this.turtle();
    }
}
module.exports = Game;
