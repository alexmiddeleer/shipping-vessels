import GridCell from "./GridCell";
import { PORT } from "./GridCell.js";
import { SHIP } from "./GridCell.js";
const rowLen = 20;
const columnLen = 20;

class Port {
  constructor(x, y) {
    this.coords = new CartesianCoords(x, y);
  }
}

class Ship {
  constructor(x, y) {
    this.coords = new CartesianCoords(x, y);
  }
}

class CartesianCoords {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  equals(x, y) {
    return this.x === x && this.y === y;
  }
}

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
  }

  rebuildGrid() {
    this.rows = [];
    const { rows, ships, ports } = this;
    for (let i = 0; i < rowLen; i++) {
      rows.push([]);
      for (let j = 0; j < columnLen; j++) {
        if (ports.find(p => p.coords.equals(i, j))) {
          rows[i].push(new GridCell(PORT));
        } else if (ships.find(p => p.coords.equals(i, j))) {
          rows[i].push(new GridCell(SHIP));
        } else {
          rows[i].push(new GridCell());
        }
      }
    }
  }
}
