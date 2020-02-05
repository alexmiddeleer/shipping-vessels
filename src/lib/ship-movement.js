import { when, TICK_EVENT } from "./event-bus.js";

export default function init() {
  when(TICK_EVENT, ({ detail: { app } }) => {
    // for each ship
    app.gridState.ships.forEach(ship => {
      // eslint-disable-next-line
      console.log("ship: ", ship);
      // if that ship is not at port, move one unit towards destination port
      // if that ship is at port, randomly pick different port to visit
    });
  });
}
