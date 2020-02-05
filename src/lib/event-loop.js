import {
  TickEvent,
  pushEvent,
  when,
  INIT_EVENT,
  InitEvent
} from "./event-bus.js";

export default function initAppState(app) {
  when(INIT_EVENT, onInit);
  // let event handlers register before starting
  setTimeout(() => pushEvent(new InitEvent(app)), 10);
}

async function onInit(e) {
  const app = e.detail.app;
  // eslint-disable-next-line
  while (true) {
    if (!app.paused) {
      pushEvent(new TickEvent(app));
    }
    await sleep(1000);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
