import { storeEvent } from "./event-storage.js";
// import { loadEvents } from "./event-storage.js";

const debuggers = [];

export function registerDebugger(cb) {
  debuggers.push(cb);
}

function beforeEvent(e, options) {
  debuggers.forEach(cb => cb(e));
  const doStoreEvent = !(options && options.noStore);
  if (doStoreEvent) {
    storeEvent(e);
  }
  return e;
}

export function when(evtName, cb) {
  document.documentElement.addEventListener(evtName, cb);
}

export function pushEvent(evt, options) {
  const customEvent = new CustomEvent(`${evt.type}`, {
    detail: evt
  });
  beforeEvent(customEvent, options);
  document.documentElement.dispatchEvent(customEvent);
}
