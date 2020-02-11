import {
  TickEvent,
  pushEvent,
  when,
  INIT_EVENT,
  InitEvent
} from "./event-bus.js";

const TICK_LEN_MS = 300;

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
    await sleep(TICK_LEN_MS);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
