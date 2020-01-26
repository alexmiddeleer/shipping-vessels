import AppEvent, { pushEvent } from "./event-bus.js";
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function startEventLoop(vueApp) {
  // eslint-disable-next-line
  while (true) {
    // for each ship
    // if that ship is not at port, move one unit towards destination port
    // if that ship is at port, randomly pick different port to visit
    if (!vueApp.paused) {
      pushEvent(new AppEvent());
    }
    await sleep(1000);
  }
}
