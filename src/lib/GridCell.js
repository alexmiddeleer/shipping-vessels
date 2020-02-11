export const WAVE = "🌊";
export const SHIP = "🚢";
export const PORT = "🌆";
export const OCCUPIED_PORT = "🏙";
export default class GridCell {
  constructor(type = WAVE) {
    this.type = type;
  }
}
