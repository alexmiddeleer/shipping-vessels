import { when, TICK_EVENT } from "./event-bus.js";
import CartesianCoords from "./CartesianCoordinates.js";

export default function init() {
  when(TICK_EVENT, ({ detail: { app } }) => {
    // for each ship
    app.gridState.ships.forEach(ship => {
      // if that ship is not at port, move one unit towards destination port

      const shipCoords = ship.coords;
      const portCoords = ship.destinationPort.coords;
      if (shipCoords.equals(portCoords)) {
        ship.destinationPort = getRandomPort(app.gridState.ports);
      } else {
        // move ship towards current destination port
        moveCloserToPort(ship);
      }
    });
  });
}

function getRandomPort(ports) {
  const randomIndex = Math.floor(Math.random() * ports.length);
  return ports[randomIndex];
}

function moveCloserToPort(ship) {
  const shipCoords = ship.coords;
  const portCoords = ship.destinationPort.coords;

  const diffX = portCoords.x - shipCoords.x;
  const diffY = portCoords.y - shipCoords.y;

  const mvmtX = Math.min(Math.max(diffX, -1), 1);
  const mvmtY = Math.min(Math.max(diffY, -1), 1);

  const newX = shipCoords.x + mvmtX;
  const newY = shipCoords.y + mvmtY;

  ship.updateCoords(new CartesianCoords(newX, newY));
}
