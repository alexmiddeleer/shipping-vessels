import AppEvent from "./AppEvent.js";

export const INIT_EVENT = "app-init";

export default class InitEvent extends AppEvent {
  constructor(app) {
    super(INIT_EVENT, "app initialized");
    this.app = app;
  }

  static fromPojo() {
    return new InitEvent();
  }
}
