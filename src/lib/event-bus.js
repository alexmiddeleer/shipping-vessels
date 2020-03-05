export const DEBUG_EVENT = "app-debug";
export const INIT_EVENT = "app-init";
export const TICK_EVENT = "app-tick";
export const MOVEMENT_EVENT = "map-obj-move";
import { storeEvent } from "./event-storage.js";
// import { loadEvents } from "./event-storage.js";

const debuggers = [];

export function registerDebugger(cb) {
  debuggers.push(cb);
}

function beforeEvent(e) {
  debuggers.forEach(cb => cb(e));
  storeEvent(e);
  return e;
}

export function when(evtName, cb) {
  document.documentElement.addEventListener(evtName, cb);
}

export function pushEvent(evt) {
  const customEvent = new CustomEvent(`${evt.type}`, {
    detail: evt
  });
  beforeEvent(customEvent);
  document.documentElement.dispatchEvent(customEvent);
}

export default class AppEvent {
  constructor(type = DEBUG_EVENT, message = "debug event") {
    this.date = new Date();
    this.type = type;
    this.message = message;
  }

  toPojo() {
    return {
      date: this.date,
      type: this.type,
      message: this.message
    };
  }

  toJson() {
    return JSON.stringify(this.toPojo());
  }
}

export class InitEvent extends AppEvent {
  constructor(app) {
    super(INIT_EVENT, "app initialized");
    this.app = app;
  }
}

export class TickEvent extends AppEvent {
  constructor(app) {
    super(TICK_EVENT, "tick occurred");
    this.app = app;
  }
}

export class MovementEvent extends AppEvent {
  constructor(coords, oldCoords, id) {
    super(MOVEMENT_EVENT, `map object moved to ${coords} from ${oldCoords}`);
    this.coords = coords;
    this.oldCoords = oldCoords;
    this.id = id;
  }

  toPojo() {
    return {
      date: this.date,
      type: this.type,
      message: this.message,
      coords: this.coords,
      oldCoords: this.oldCoords,
      id: this.id
    };
  }
}