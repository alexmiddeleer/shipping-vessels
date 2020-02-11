import { when, TICK_EVENT } from "./event-bus.js";
import CartesianCoords from "./CartesianCoordinates.js";

export default function init() {
  when(TICK_EVENT, ({ detail: { app } }) => {
    // for each ship
    app.gridState.ships.forEach(ship => {
      // if that ship is not at port, move one unit towards destination port

      const shipCoords = ship.coords;
      const portCoords = ship.destinationPort;
      if (shipCoords.equals(portCoords)) {
        // set a new destination port
      } else {
        // move ship towards current destination port
        ship.updateCoords(new CartesianCoords(1, 1));
      }
    });
  });
}
