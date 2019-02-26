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
}

module.exports = Snake;