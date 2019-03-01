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
    /* this function creates a clockwise "turtle" it takes the previous move and looks what
     * the next move would be, and if that move is available it does it. If it's not
     * available it tries the pervious move, and if not iterates to any posible move from the list
     */

    turtle2() {
        let directions = ["down", "left", "up", "right"];
        let lastMove = directions.indexOf(this.me.lastMove());
        var prefNextMove = directions[(lastMove + 1) % 4];

        //check the next preferred move
        if (this.board.searchDirection(this.me.head, prefNextMove)) {
            return prefNextMove;

        //if the preferred move isn't available check the last direction
        } else if (this.board.searchDirection(this.me.head, directions[lastMove])) {
            return directions[lastMove];

        //if neither the preferred move nor the last move is available go any availble direction
        } else {
            if (this.board.searchDown(this.me.head) && this.me.lastMove()) {
                return "down";
            } else if (this.board.searchLeft(this.me.head)) {
                return "left";
            } else if (this.board.searchUp(this.me.head)) {
                return "up";
            } else if (this.board.searchRight(this.me.head)) {
                return "right";
            } else {
                return "down";
            }
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
        return this.turtle2();
    }
}
module.exports = Game;
