export const DEBUG_EVENT = "app-debug";
export const INIT_EVENT = "app-init";
export const TICK_EVENT = "app-tick";
export const MOVEMENT_EVENT = "map-obj-move";

const debuggers = [];

export function registerDebugger(cb) {
  debuggers.push(cb);
}

function beforeEvent(e) {
  debuggers.forEach(cb => cb(e));
  storeEvent(e);
  return e;
}

function storeEvent(e) {
  const events = sessionStorage.getItem("events") || "";
  const serialized = e.detail.toJson();
  if (events.length > 50000) {
    return; // TODO - truncate old events
  }
  sessionStorage.setItem("events", `${events}%%%${serialized}`);
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
  constructor(coords, oldCoords) {
    super(MOVEMENT_EVENT, `map object moved to ${coords} from ${oldCoords}`);
  }
}
