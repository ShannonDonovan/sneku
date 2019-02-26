class Coordinate {
  constructor(data) {
    this.x = data.x;
    this.y = data.y;
  }

  distanceTo(other) {
  	return Math.abs(other.x - this.x) + Math.abs(other.y - this.y);
  }

  /* a toString for debugging*/
  toString() {
  	return 'X: ' + this.x + ', Y: ' + this.y;
  }
  subtract(other) {
      return new Coordinate({
          x: this.x - other.x,
          y: this.y - other.y
      })
  }
}

module.exports = Coordinate;
