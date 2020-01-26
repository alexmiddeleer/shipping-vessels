export const DEBUG_EVENT = "app-debug";

export function when(evtName, cb) {
  document.documentElement.addEventListener(evtName, cb);
}

export function pushEvent(evt) {
  document.documentElement.dispatchEvent(
    new CustomEvent(`app-${evt.type}`, {
      detail: evt
    })
  );
}

export default class AppEvent {
  constructor(type = "debug", message = "debug message") {
    this.date = new Date();
    this.type = type;
    this.message = message;
  }
}
