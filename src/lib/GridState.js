import GridCell from "./GridCell";
import { PORT } from "./GridCell.js";
import { SHIP } from "./GridCell.js";
const rowLen = 20;
const columnLen = 20;
const spot = (x, y) => `${x},${y}`;
export default class GridState {
  constructor() {
    const ships = [spot(2, 2), spot(10, 18), spot(16, 4)];
    const ports = [spot(5, 11), spot(12, 17), spot(3, 6), spot(13, 5)];
    const rows = [];
    this.rows = rows;
    this.ships = ships;
    this.ports = ports;
    this.rebuildGrid();
  }

  rebuildGrid() {
    const { rows, ships, ports } = this;
    for (let i = 0; i < rowLen; i++) {
      rows.push([]);
      for (let j = 0; j < columnLen; j++) {
        const aSpot = spot(i, j);
        if (ports.indexOf(aSpot) > -1) {
          rows[i].push(new GridCell(PORT));
        } else if (ships.indexOf(aSpot) > -1) {
          rows[i].push(new GridCell(SHIP));
        } else {
          rows[i].push(new GridCell());
        }
      }
    }
  }
}
