export default class CartesianCoords {
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
}
