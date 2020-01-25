import GridCell from "./GridCell";
import { PORT } from "./GridCell.js";
import { BOAT } from "./GridCell.js";
const rowLen = 20;
const columnLen = 20;
const spot = (x, y) => `${x},${y}`;
export default class GridState {
  constructor() {
    const boats = [spot(2, 2), spot(10, 18), spot(16, 4)];
    const ports = [spot(5, 11), spot(12, 17), spot(3, 6), spot(13, 5)];
    const rows = [];
    for (let i = 0; i < rowLen; i++) {
      rows.push([]);
      for (let j = 0; j < columnLen; j++) {
        const aSpot = spot(i, j);
        if (ports.indexOf(aSpot) > -1) {
          rows[i].push(new GridCell(PORT));
        } else if (boats.indexOf(aSpot) > -1) {
          rows[i].push(new GridCell(BOAT));
        } else {
          rows[i].push(new GridCell());
        }
      }
    }
    this.rows = rows;
  }
}
