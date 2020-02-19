import { INIT_EVENT } from "../event-bus.js";
import AppEvent from "./app.js";
export class InitEvent extends AppEvent {
  constructor(app) {
    super(INIT_EVENT, "app initialized");
    this.app = app;
  }
}
