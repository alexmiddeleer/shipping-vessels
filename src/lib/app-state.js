import AppEvent, {
  pushEvent,
  when,
  INIT_EVENT,
  InitEvent
} from "./event-bus.js";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function init(app) {
  when(INIT_EVENT, onInit);
  // let event handlers register before starting
  setTimeout(() => pushEvent(new InitEvent(app)), 10);
}

function onInit(e) {
  startEventLoop(e.detail.app);
}

async function startEventLoop(app) {
  // eslint-disable-next-line
  while (true) {
    // for each ship
    // if that ship is not at port, move one unit towards destination port
    // if that ship is at port, randomly pick different port to visit
    if (!app.paused) {
      pushEvent(new AppEvent());
    }
    await sleep(1000);
  }
}
