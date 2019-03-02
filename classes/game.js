let Board = require("./board.js");
let Snake = require("./snake.js");
class Game{
    constructor(data){
        this.turn = data.turn;
        this.me = new Snake(data.you);
		this.board = new Board(data.board, this.me);
    }
    
	/* this function makes the snake look for the closest piece of food and
     * take the shortest path to that piece of food. If the path directly in
     * front is blocked then it will attempt to go to the either side before
	 * going in the opposite direction
     */

    findFood(){
		let foodLength = this.board.food.length;
		let foodArr = this.board.food;
		
		let closeFoodX = 0;
		let closeFoodY = 0;
		let foodDistanceSquare = -1;
		
		let headX = this.me.head.x;
		let headY = this.me.head.y;
		
		//finds closest food
		foodArr.forEach(function(food){
			let diffx = food.x - headX;
			let diffy = food.y - headY;
			
			let temp = (Math.pow(diffx,2) + Math.pow(diffy,2));
			if (temp < foodDistanceSquare || foodDistanceSquare < 0){
				foodDistanceSquare = temp;
				closeFoodX = food.x;
				closeFoodY = food.y;
			}
		}); 
        let needed_directions = []
		
		//heads in the direction of the food (x direction first)
		if(headX < closeFoodX){//food to right

            if (this.safeDirection("right", this.head)) {
                return "right";
            } else {
                return this.safeMove();
            }
			
			//searches for safe direction
			if(this.board.searchRight(this.me.head) == 2 && this.safeDirection("right")){
				return "right";
			} else if(this.board.searchDown(this.me.head) == 2 && this.safeDirection("down")){
				return "down";
			} else if(this.board.searchUp(this.me.head) == 2 && this.safeDirection("up")){
				return "up";
			} else if(this.board.searchLeft(this.me.head) == 2 && this.safeDirection("left")){
				return "left";
			}
			
		}else if(headX > closeFoodX){//food to left
		
			if(this.board.searchLeft(this.me.head) == 2 && this.safeDirection("left")){
				return "left";
			} else if(this.board.searchDown(this.me.head) == 2 && this.safeDirection("down")){
				return "down";
			} else if(this.board.searchUp(this.me.head) == 2 && this.safeDirection("up")){
				return "up";
			} else if(this.board.searchRight(this.me.head) == 2 && this.safeDirection("right")){
				return "right";
			}
			
		}else if(headY < closeFoodY){//food to down
		
			if(this.board.searchDown(this.me.head) == 2 && this.safeDirection("down")){
				return "down";
			} else if(this.board.searchRight(this.me.head) == 2 && this.safeDirection("right")){
				return "right";
			} else if(this.board.searchLeft(this.me.head) == 2 && this.safeDirection("left")){
				return "left";
			} else if(this.board.searchUp(this.me.head) == 2 && this.safeDirection("up")){
				return "up";
			} else {
				return "up";
			}
			
		}else if(headY > closeFoodY){//food to up
			
			if(this.board.searchUp(this.me.head) == 2 && this.safeDirection("up")){
				return "up";
			} else if(this.board.searchRight(this.me.head) == 2 && this.safeDirection("right")){
				return "right";
			} else if(this.board.searchLeft(this.me.head) == 2 && this.safeDirection("left")){
				return "left";
			} else if(this.board.searchDown(this.me.head) == 2 && this.safeDirection("down")){
				return "down";
			}
		} else {
            console.log("ASDF");
            return this.turtle2();
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
        if (this.board.searchDirection(this.me.head, prefNextMove) == 2 && this.safeDirection(prefNextMove)) {
            return prefNextMove;

        //if the preferred move isn't available check the last direction
        } else if (this.board.searchDirection(this.me.head, directions[lastMove]) == 2 && this.safeDirection(directions[lastMove])) {
			return directions[lastMove];

        //if neither the preferred move nor the last move is available go any available direction
        } else {
            if (this.board.searchDown(this.me.head) == 2 && this.me.lastMove() && this.safeDirection("down")) {
                return "down";
				
            } else if (this.board.searchLeft(this.me.head) == 2 && this.safeDirection("left")) {
				return "left";
				
            } else if (this.board.searchUp(this.me.head) == 2 && this.safeDirection("up")) {
				return "up";
				
            } else if (this.board.searchRight(this.me.head) == 2 && this.safeDirection("right")) {
				return "right";
				
            } else {
				
				//last check in case an available spot is a tail that will move
				if(this.tailCheck(this.me.head, "up")){
					return "up";
				} else if(this.tailCheck(this.me.head, "down")){
					return "down";
				} else if(this.tailCheck(this.me.head, "right")){
					return "right";
				} else if(this.tailCheck(this.me.head, "left")){
					return "left";
				}
				
				//just move anywhere that is directly
				//safe to stay alive a bit longer
				if(this.board.searchUp(this.me.head) == 1){
					return "up";
				} else if(this.board.searchDown(this.me.head) == 1){
					return "down";
				} else if(this.board.searchRight(this.me.head) == 1){
					return "right";
				} else if(this.board.searchLeft(this.me.head) == 1){
					return "left";
				}
				
				//if we get here, we're likely dead
                return "down";
            }
        }
    }
	
	//checks if the given location and direction is occupied by a tail
	tailCheck(head, direction) {
		
		let changeInX = 0;
		let changeInY = 0;
		
		if(direction == "down") {
			changeInY = 1;
		}else if(direction == "left") {
			changeInX = -1;
		}else if(direction == "up") {
			changeInY = -1;
		}else if(direction == "right") {
			changeInX = 1;
		}
		
		if((head.x + changeInX) == this.me.tail.x && (head.y + changeInY) == this.me.tail.y) {
			return true;
		}
		return false;
	}
    

    /* moves the snake in the given order, this snake is "safe"
    * it will not hunt for food, but it will not hit walls or itself.
     */
    safeMove(){
        const ALL_DIRECTIONS = ["up", "left", "right", "down"];
        let safe = ALL_DIRECTIONS.filter(d => {
            return this.board.safeDirection(d, this.me.head) == 2;
        });
        if (safe.length > 0) {
            return safe[0];
        }
        let kindaSave = ALL_DIRECTIONS.filter(d => {
            return this.board.safeDirection(d, this.me.head) == 1;
        });
        if (kindaSafe.length > 0) {
            return kindaSafe[0];
        }
        return "fuck you";
    }
	
	/* This function checks if the location the snake is trying to move into has empty spaces
     * around it. If there's only one empty space (aka it can only move in one direction) it
	 * iterates along that direction until hitting a wall then checks hte empty spaces around again.
	 * If the empty spaces around is 0 then that location will trap the snake and we shouldn't go there.
     */
	safeDirection(direction){
		let changeInX = 0;
		let changeInY = 0;
		
		//assigns a change value depending on direction
		if(direction == "down") {
			changeInY = 1;
		}else if(direction == "left") {
			changeInX = -1;
		}else if(direction == "up") {
			changeInY = -1;
		}else if(direction == "right") {
			changeInX = 1;
		}
		
		let checkX = this.me.head.x + changeInX;
		let checkY = this.me.head.y + changeInY;
		
		//holds the coordinates of the spott we are trying to move into
		const checkLoc = {
			x: checkX,
			y: checkY
		}
		
		//used to count the number of directions a snake can move from the current location
		let freeDirectionCount = 0;
		
		if(this.board.searchUp(checkLoc) || this.tailCheck(checkLoc, "up")){
			freeDirectionCount++;
		}
		
		if(this.board.searchDown(checkLoc) || this.tailCheck(checkLoc, "down")){
			freeDirectionCount++;
		}
		
		if(this.board.searchRight(checkLoc) || this.tailCheck(checkLoc, "right")){
			freeDirectionCount++;
		}
		
		if(this.board.searchLeft(checkLoc) || this.tailCheck(checkLoc, "left")){
			freeDirectionCount++;
		}
		
		//if theres only one direction to go in, keep going until you can't anymore. Then check around you
		if(freeDirectionCount == 1 || freeDirectionCount == 0 ){
			while(this.searchDirection(direction, checkLoc)) {
				checkLoc.x += changeInX;
				checkLoc.y += changeInY;
			}
			
			
			freeDirectionCount = 0;
			if(this.board.searchUp(checkLoc) || this.tailCheck(checkLoc, "up")){
				if(direction != "down"){
					freeDirectionCount++;
				}
			}
			
			if(this.board.searchDown(checkLoc) || this.tailCheck(checkLoc, "down")){
				if(direction != "up"){
				freeDirectionCount++;
				}
			}
			
			if(this.board.searchRight(checkLoc) || this.tailCheck(checkLoc, "right")){
				if(direction != "left"){
					freeDirectionCount++;
				}
			}
			
			if(this.board.searchLeft(checkLoc) || this.tailCheck(checkLoc, "left")){
				if(direction != "right"){
					freeDirectionCount++;
				}
			}
			
			//if theres no free directions at the end of our route don't go there
			if(freeDirectionCount == 0){
				return false
			}
		}
		return true;
    }
	
	//searches a direction for you
	searchDirection(direction, loc) {
		if(direction == "down") {
			return this.board.searchDown(loc);
		}else if(direction == "left") {
			return this.board.searchLeft(loc);
		}else if(direction == "up") {
			return this.board.searchUp(loc);
		}else if(direction == "right") {
			return this.board.searchRight(loc);
		}
	}

    /* this is the order in which our snake will do things, for example if we want it
    * to do safeMove until it needs food we need to add a case for that like if
    * health < whatever then get food, otherwise do safe move
     */
    getMove(){
        if (this.me.body.length < 7 && this.board.food.length > 2)
            return this.findFood();
		if(this.me.health < 80) {
			return this.findFood();
		}
        return this.turtle2();
    }
}
module.exports = Game;
