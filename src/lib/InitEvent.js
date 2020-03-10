import AppEvent from "./AppEvent.js";

export const INIT_EVENT = "app-init";

export default class InitEvent extends AppEvent {
  constructor() {
    super(INIT_EVENT, "app initialized");
  }

  static fromPojo() {
    return new InitEvent();
  }
}
