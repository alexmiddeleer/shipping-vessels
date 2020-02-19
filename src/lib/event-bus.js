export const INIT_EVENT = "app-init";
export const TICK_EVENT = "app-tick";
export const MOVEMENT_EVENT = "map-obj-move";
import { storeEvent } from "./event-storage.js";
import { loadEvents } from "./event-storage.js";
export AppEvent from './events/app';

const debuggers = [];

export function registerDebugger(cb) {
  debuggers.push(cb);
}

function beforeEvent(e) {
  debuggers.forEach(cb => cb(e));
  storeEvent(e);
  const debugEvents = loadEvents();
  // eslint-disable-next-line
  console.log("debugEvents: ", debugEvents);
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
