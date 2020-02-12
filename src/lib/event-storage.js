export function storeEvent(e) {
  const events = sessionStorage.getItem("events") || "";
  const serialized = e.detail.toJson();
  if (events.length > 50000) {
    return; // TODO - truncate old events
  }
  sessionStorage.setItem("events", `${events}%%${serialized}`);
}

export function loadEvents() {
  const events = sessionStorage.getItem("events");
  return events;
}
