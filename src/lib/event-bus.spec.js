import { pushEvent, registerDebugger } from "./event-bus.js";
import { storeEvent } from "./event-storage.js";
import AppEvent, { DEBUG_EVENT } from "./AppEvent.js";

jest.mock("./event-storage");

beforeEach(() => {
  storeEvent.mockClear();
});

describe("Event Bus", function() {
  describe("pushEvent", function() {
    it("works", function() {
      const spy = jest.spyOn(document.documentElement, "dispatchEvent");
      pushEvent(new AppEvent());
      expect(spy).toHaveBeenCalled();
    });
    it("calls debuggers", function() {
      const cb = jest.fn();
      registerDebugger(cb);
      pushEvent(new AppEvent());
      expect(cb).toHaveBeenCalled();
    });
    it("stores events", function() {
      pushEvent(new AppEvent());
      expect(storeEvent).toHaveBeenCalled();
      expect(storeEvent.mock.calls[0][0].detail.type).toBe(DEBUG_EVENT);
    });
    it("does not store events if option is off", function() {
      pushEvent(new AppEvent(), { noStore: true });
      expect(storeEvent).not.toHaveBeenCalled();
    });
  });
});
