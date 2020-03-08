import AppEvent from "./AppEvent.js";

export const MOVEMENT_EVENT = "map-obj-move";

export default class MovementEvent extends AppEvent {
  constructor(coords, oldCoords, id) {
    super(MOVEMENT_EVENT, `map object moved to ${coords} from ${oldCoords}`);
    this.coords = coords;
    this.oldCoords = oldCoords;
    this.id = id;
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
}
