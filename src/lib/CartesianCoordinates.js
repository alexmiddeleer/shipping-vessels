export default class CartesianCoordinates {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  equals(coords) {
    if (!coords) {
      return false;
    }
    return this.x === coords.x && this.y === coords.y;
  }
  toString() {
    return `x: ${this.x}, y: ${this.y}`;
  }
  static fromPojo(pojo) {
    return new CartesianCoordinates(pojo.x, pojo.y);
  }
}
