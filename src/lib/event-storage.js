const DELIMITER = '%%';

import { MovementEvent, MOVEMENT_EVENT } from './event-bus';

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
    sessionStorage.setItem("events", `${serializedEvents}${DELIMITER}${newSerializedEvent}`);
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
    try {
      return createEventFromType(JSON.parse(event));
    } catch (error) {
      // eslint-disable-next-line
      console.error('error parsing', event);
    }
  });
}

function createEventFromType(pojo) {
  if (!pojo.type) {
    throw new Error('not a valid event - event must have a type');
  }
  if (pojo.type === MOVEMENT_EVENT) {
    return new MovementEvent(pojo.coords, pojo.oldCoords);
  }
  return pojo;
}