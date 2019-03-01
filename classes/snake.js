let Coordinate = require("./coordinate.js");
class Snake{
    constructor(data){
     this.health = data.health;
     this.body = data.body.map(x => new Coordinate(x));
     this.head = this.body[0];

    }

    /* this checks if there is a snake at a specific x,y coordinate
    * returns false if a snake is NOT in the location and true if there is
     */
    doesOccupyLocation(coord){
       return this.body.some(function(c){
            return coord.x === c.x && coord.y === c.y;
        });
    }
    // Get the length of the snake
    length() {
        return this.body.length;
    }


    /* checks the last move using the position where the head
     * would have just been and returns a direction string
     */
    lastMove() {
        const diff = this.head.subtract(this.body[1]);
        console.log("diff is" + diff);
        if (diff.x === 1) {
            return "right";
        } else if (diff.x === -1) {
            return "left";
        } else if (diff.y === -1) {
            return "up";
        } else {
            return "down";
        }
    }
}

module.exports = Snake;
