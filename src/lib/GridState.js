import GridCell from "./GridCell";
const rowLen = 20;
const columnLen = 20;
export default class GridState {
  constructor() {
    const rows = [];
    for (let i = 0; i < rowLen; i++) {
      rows.push([]);
      for (let j = 0; j < columnLen; j++) {
        rows[i].push(new GridCell());
      }
    }
  }
}
