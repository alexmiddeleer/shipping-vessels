import CartesianCoords from "./CartesianCoordinates.js";

export default class MapObject {
  constructor(x, y) {
    this.coords = new CartesianCoords(x, y);
  }
}
