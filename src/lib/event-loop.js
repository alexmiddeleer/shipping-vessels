import { pushEvent, when } from "./event-bus.js";
import TickEvent from "./TickEvent.js";
import InitEvent, { INIT_EVENT } from "./InitEvent.js";
import { MOVEMENT_EVENT } from "./MovementEvent.js";

import { loadEvents } from "./event-storage";

const TICK_LEN_MS = 300;
let app;

export default function initAppState(theApp) {
  app = theApp;
  when(INIT_EVENT, onInit);
  // let event handlers register before starting
  setTimeout(() => pushEvent(new InitEvent(app)), 10);
}

async function onInit() {
  // eslint-disable-next-line
  while (true) {
    if (!app.paused) {
      pushEvent(new TickEvent(app));
    }
    await sleep(TICK_LEN_MS);
  }
}

export async function replayEvents() {
  const loadedEvents = loadEvents();
  // eslint-disable-next-line
  console.log("loadedEvents", loadedEvents);
  // eslint-disable-next-line
  for (const event of loadedEvents) {
    pushEvent(event);
    if (event.type === MOVEMENT_EVENT) {
      await sleep(Math.floor(TICK_LEN_MS / 2));
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
