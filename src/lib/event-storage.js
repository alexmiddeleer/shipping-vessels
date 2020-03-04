const DELIMITER = '%%';

export function storeEvent(e) {
  const serializedEvents = sessionStorage.getItem("events") || "";
  let newSerializedEvent;
  try {
    newSerializedEvent = e.detail.toJson();
  } catch (error) {
    // eslint-disable-next-line
    console.log('failure to serialize', e);
    return;
  }
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
  // eslint-disable-next-line
  console.log('eventStrings', eventStrings);
  return eventStrings.map(event => {
    try {
      return JSON.parse(event);
    } catch (error) {
      // eslint-disable-next-line
      console.error('error parsing', event);
    }
  });

}
