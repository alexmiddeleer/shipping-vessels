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
      document.documentElement.dispatchEvent(
        new CustomEvent("app-event", {
          detail: {
            date: new Date(),
            type: "debug",
            message: "just a test"
          }
        })
      );
    }
    await sleep(1000);
  }
}
