export const WAVE = "🌊";
export const SHIP = "🚢";
export const PORT = "🌆";
export default class GridCell {
  constructor(type = WAVE) {
    this.type = type;
  }
}
