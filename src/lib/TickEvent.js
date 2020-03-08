import AppEvent from "./AppEvent.js";

export const TICK_EVENT = "app-tick";

export default class TickEvent extends AppEvent {
  constructor(app) {
    super(TICK_EVENT, "tick occurred");
    this.app = app;
  }
}
