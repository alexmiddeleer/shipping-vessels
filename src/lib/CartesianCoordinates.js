export default class CartesianCoords {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  equals(x, y) {
    return this.x === x && this.y === y;
  }
}
