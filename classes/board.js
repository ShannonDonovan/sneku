let Coordinate = require("./coordinate.js");
let Snake = require("./snake.js");

class Board {
    constructor(data) {
        this.height = data.height;
        this.width = data.width;
        this.food = data.food.map(c => new Coordinate(c));
        this.snakes = data.snakes.map(s => new Snake(s));
    }
    /* checks if the given coordinate is either a wall or if there is a snake
    * returns true if it safe, false if it is not.*/
    coordisSafe(coord) {
        let snakeAtLocation = this.snakes.some(function (s) {
            return s.doesOccupyLocation(coord);
        });
        let checkHeight = this.height > coord.y && coord.y >= 0;
        let checkWidth = this.width > coord.x && coord.x >= 0;
        return !snakeAtLocation && checkHeight && checkWidth;
    }


        /* checks if going in a specific direction will be safe, calls the previous
        * method with the x and y values of the prospective location
         */
    searchRight(coord) {
        console.log("safe1");
        let rightCoord = new Coordinate({x: coord.x + 1, y: coord.y});
        return this.coordisSafe(rightCoord);
    }

    searchLeft(coord) {
        let leftCoord = new Coordinate({ x: coord.x - 1, y: coord.y });
        console.log("safe2");
        return this.coordisSafe(leftCoord);
    }

    searchUp (coord) {
        let upCoord = new Coordinate({ x: coord.x, y: coord.y - 1 });
        console.log("safe3");
        return this.coordisSafe(upCoord);
    }

    searchDown(coord) {
        let downCoord = new Coordinate({ x: coord.x, y: coord.y + 1 });
        console.log("safe4");
        return this.coordisSafe(downCoord);
    }

    searchDirection(coord, direction) {
        if (direction === "up") {
            return this.searchUp(coord);
        } else if (direction === "down") {
            return this.searchDown(coord);
        } else if (direction === "right") {
            return this.searchRight(coord);
        } else if (direction === "left") {
            return this.searchLeft(coord);
        }
    }
}

module.exports = Board;