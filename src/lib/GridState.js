import GridCell, { PORT, SHIP, OCCUPIED_PORT } from "./GridCell";
import CartesianCoords from "./CartesianCoordinates.js";
import { when, MOVEMENT_EVENT } from "./event-bus.js";
import Ship from "./Ship.js";
import Port from "./Port.js";
const rowLen = 20;
const columnLen = 20;

export default class GridState {
  constructor() {
    const ports = [
      new Port(5, 11, 1),
      new Port(12, 17, 2),
      new Port(3, 6, 3),
      new Port(13, 5, 4)
    ];
    const ships = [
      new Ship(2, 2, 5, ports[0]),
      new Ship(10, 18, 6, ports[1]),
      new Ship(16, 4, 7, ports[2])
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
    const isPort = ports.find(p => p.coords.equals(cellCoords));
    const isShip = ships.find(s => s.coords.equals(cellCoords));
    if (isPort && isShip) {
      return new GridCell(OCCUPIED_PORT);
    } else if (isPort) {
      return new GridCell(PORT);
    } else if (isShip) {
      return new GridCell(SHIP);
    } else {
      return new GridCell();
    }
  }

  initEventHandler() {
    when(MOVEMENT_EVENT, ({ detail: { id, coords } }) => {
      const mapObject = this.findMapObject(id);
      mapObject.updateCoords(coords);
      this.rebuildGrid();
    });
  }

  findMapObject(id) {
    const foundShip = this.ships.find(s => s.id === id);
    if (foundShip) {
      return foundShip
    }
    const foundPort = this.ports.find(p => p.id === id);
    if (foundPort) {
      return foundPort
    }
    throw new Error(`failed to find map object with id: ${id}`);
  }
}
