import GridCell from "./GridCell";
import { PORT } from "./GridCell.js";
import { SHIP } from "./GridCell.js";
import CartesianCoords from "./CartesianCoordinates.js";
import { when, MOVEMENT_EVENT } from "./event-bus.js";
import Ship from "./Ship.js";
import Port from "./Port.js";
const rowLen = 20;
const columnLen = 20;

export default class GridState {
  constructor() {
    const ships = [new Ship(2, 2), new Ship(10, 18), new Ship(16, 4)];
    const ports = [
      new Port(5, 11),
      new Port(12, 17),
      new Port(3, 6),
      new Port(13, 5)
    ];
    const rows = [];
    this.rows = rows;
    this.ships = ships;
    this.ports = ports;
    this.rebuildGrid();
    this.initEventHandler();
  }

  rebuildGrid() {
    this.rows = [];
    const { rows } = this;
    for (let i = 0; i < rowLen; i++) {
      rows.push([]);
      for (let j = 0; j < columnLen; j++) {
        rows[i].push(this.rebuildGridCell(i, j));
      }
    }
  }

  rebuildGridCell(x, y) {
    const { ships, ports } = this;
    const cellCoords = new CartesianCoords(x, y);
    if (ports.find(p => p.coords.equals(cellCoords))) {
      return new GridCell(PORT);
    } else if (ships.find(s => s.coords.equals(cellCoords))) {
      return new GridCell(SHIP);
    } else {
      return new GridCell();
    }
  }

  initEventHandler() {
    when(MOVEMENT_EVENT, () => {
      this.rebuildGrid();
    });
  }
}
