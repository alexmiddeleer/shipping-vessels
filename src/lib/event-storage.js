const DELIMITER = "%%";
import eventDeserializer from './event-deserializer.js';

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
    return eventDeserializer(JSON.parse(event));
  });
}
