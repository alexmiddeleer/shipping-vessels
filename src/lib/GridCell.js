export const WAVE = "🌊";
export const BOAT = "🚢";
export const PORT = "🌆";
export default class GridCell {
  constructor(type = WAVE) {
    this.type = type;
  }
}
