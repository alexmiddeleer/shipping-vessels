import eventDeserializer from "./event-deserializer.js";
import MovementEvent, { MOVEMENT_EVENT } from "./MovementEvent.js";
import TickEvent, { TICK_EVENT } from "./TickEvent.js";
import InitEvent, { INIT_EVENT } from "./InitEvent.js";
import AppEvent from "./AppEvent.js";

describe("Event Deserializer", function() {
  it("should work for movement events", function() {
    const result = eventDeserializer({ type: MOVEMENT_EVENT });
    expect(result).toBeInstanceOf(MovementEvent);
  });
  it("should work for app events", function() {
    const result = eventDeserializer({});
    expect(result).toBeInstanceOf(AppEvent);
  });
  it("should work for tick events", function() {
    const result = eventDeserializer({ type: TICK_EVENT });
    expect(result).toBeInstanceOf(TickEvent);
  });
  it("should work for init events", function() {
    const result = eventDeserializer({ type: INIT_EVENT });
    expect(result).toBeInstanceOf(InitEvent);
  });
});
