const DELIMITER = "%%";

export function storeEvent(e) {
  const serializedEvents = sessionStorage.getItem("events") || "";
  let newSerializedEvent;
  newSerializedEvent = e.detail.toJson();
  if (serializedEvents.length > 50000) {
    return; // TODO - truncate old events
  }
  if (!serializedEvents.length) {
    sessionStorage.setItem("events", `${newSerializedEvent}`);
  } else {
    sessionStorage.setItem(
      "events",
      `${serializedEvents}${DELIMITER}${newSerializedEvent}`
    );
  }
}

export function loadEvents() {
  const eventsSerialized = sessionStorage.getItem("events");
  const eventsDeserialized = deserializeEvents(eventsSerialized);
  return eventsDeserialized;
}

function deserializeEvents(serializedEvents) {
  const eventStrings = serializedEvents.split(DELIMITER);
  return eventStrings.map(event => {
    return createEventFromType(JSON.parse(event));
  });
}

function createEventFromType(pojo) {
  // if (!pojo.type) {
  //   throw new Error("not a valid event - event must have a type");
  // }
  // if (pojo.type === MOVEMENT_EVENT) {
  //   if (pojo.id) {
  //     const coords = new CartesianCoords(pojo.coords.x, pojo.coords.y);
  //     const oldCoords = new CartesianCoords(pojo.oldCoords.x, pojo.oldCoords.y);
  //     return new MovementEvent(coords, oldCoords, pojo.id);
  //   } else {
  //     console.warn("Found a movement event with no id", pojo.id);
  //   }
  //   // const m = new MovementEvent(pojo.coords, pojo.oldCoords);
  //   // console.log(m);
  //   // return m
  // }
  // return new AppEvent(pojo.type, pojo.message);
}
