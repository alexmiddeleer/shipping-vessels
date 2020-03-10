import { pushEvent, when } from "./event-bus.js";
import TickEvent from "./TickEvent.js";
import InitEvent, { INIT_EVENT } from "./InitEvent.js";
import { TICK_EVENT } from "./TickEvent.js";
import AppEvent from "./AppEvent.js";

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
  pushEvent(AppEvent.consoleEvent("Replaying events"));
  const loadedEvents = loadEvents();
  pushEvent(AppEvent.consoleEvent(`Loaded ${loadedEvents.length} Events`));
  for (const event of loadedEvents) {
    pushEvent(event, { noStore: true });
    if (event.type === TICK_EVENT) {
      await sleep(Math.floor(TICK_LEN_MS / 2));
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
