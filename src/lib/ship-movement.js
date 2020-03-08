import { when, pushEvent } from "./event-bus.js";
import { TICK_EVENT } from "./TickEvent.js";
import CartesianCoords from "./CartesianCoordinates.js";
import MovementEvent from "./MovementEvent.js";

export default function init() {
  when(TICK_EVENT, ({ detail: { app } }) => {
    app.gridState.ships.forEach(ship => {
      const shipCoords = ship.coords;
      const portCoords = ship.destinationPort.coords;
      if (shipCoords.equals(portCoords)) {
        startNewRoute(ship, app.gridState.ports);
      } else {
        moveCloserToPort(ship);
      }
    });
  });
}

function startNewRoute(ship, ports) {
  const randomIndex = Math.floor(Math.random() * ports.length);
  return (ship.destinationPort = ports[randomIndex]);
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

  pushEvent(
    new MovementEvent(new CartesianCoords(newX, newY), shipCoords, ship.id)
  );
  // ship.updateCoords(new CartesianCoords(newX, newY));
}
