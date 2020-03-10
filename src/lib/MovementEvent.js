import AppEvent from "./AppEvent.js";
import CartesianCoordinates from "./CartesianCoordinates.js";

export const MOVEMENT_EVENT = "map-obj-move";

export default class MovementEvent extends AppEvent {
  constructor(coords, oldCoords, id, date = new Date()) {
    super(MOVEMENT_EVENT, `map object moved to ${coords} from ${oldCoords}`);
    this.coords = coords;
    this.oldCoords = oldCoords;
    this.id = id;
    this.date = date;
  }

  toPojo() {
    return {
      date: this.date,
      type: this.type,
      message: this.message,
      coords: this.coords,
      oldCoords: this.oldCoords,
      id: this.id
    };
  }

  static fromPojo(pojo = {}) {
    return new MovementEvent(
      CartesianCoordinates.fromPojo(pojo.coords),
      CartesianCoordinates.fromPojo(pojo.oldCoords),
      pojo.id,
      pojo.date,
      pojo.message
    );
  }
}
