import CartesianCoords from "./CartesianCoordinates.js";
import { MovementEvent, pushEvent } from "./event-bus.js";

export default class MapObject {
  #coords;

  constructor(x, y) {
    this.#coords = new CartesianCoords(x, y);
  }

  get coords() {
    return this.#coords;
  }

  updateCoords(coords) {
    this.#coords = coords;
    pushEvent(new MovementEvent(coords));
  }
}
