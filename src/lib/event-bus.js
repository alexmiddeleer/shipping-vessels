export const DEBUG_EVENT = "app-debug";
export const INIT_EVENT = "app-init";

const debuggers = [];

export function registerDebugger(cb) {
  debuggers.push(cb);
}

function beforeEvent(e) {
  debuggers.forEach(cb => cb(e));
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
}

export class InitEvent extends AppEvent {
  constructor(app) {
    super(INIT_EVENT, "app initialized");
    this.app = app;
  }
}
