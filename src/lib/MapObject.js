import CartesianCoords from "./CartesianCoordinates.js";

export default class MapObject {
  #coords;
  #id;

  constructor(x, y, id) {
    this.#coords = new CartesianCoords(x, y);
    this.#id = id;
  }

  get id() {
    return this.#id;
  }

  get coords() {
    return this.#coords;
  }

  updateCoords(coords) {
    const oldCoords = new CartesianCoords(this.coords.x, this.coords.y);
    this.#coords = coords;
  }
}
