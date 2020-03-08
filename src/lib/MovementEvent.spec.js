import MovementEvent, { MOVEMENT_EVENT } from "./MovementEvent.js";
import CartesianCoordinates from "./CartesianCoordinates.js";

const coords = (x, y) => new CartesianCoordinates(x, y);

describe("MovementEvent.fromPojo", function() {
  it("should work", function() {
    expect(MovementEvent.fromPojo()).toBeInstanceOf(MovementEvent);
  });

  describe("with Object", function() {
    const pojo = {
      date: new Date(1),
      id: 1,
      coords: new CartesianCoordinates(0, 0),
      oldCoords: new CartesianCoordinates(0, 0),
      type: MOVEMENT_EVENT
    };
    it("should have the correct props", function() {
      const result = MovementEvent.fromPojo(pojo);
      expect(result.id).toBe(1);
      expect(result.date).toEqual(new Date(1));
      expect(result.message).toEqual(
        "map object moved to x: 0, y: 0 from x: 0, y: 0"
      );
      expect(result.coords).toEqual(new CartesianCoordinates(0, 0));
      expect(result.coords).toBeInstanceOf(CartesianCoordinates);
      expect(result.oldCoords).toEqual(new CartesianCoordinates(0, 0));
      expect(result.oldCoords).toBeInstanceOf(CartesianCoordinates);
      expect(result.type).toEqual(MOVEMENT_EVENT);
    });
  });
});

describe("toPojo", function() {
  let e = new MovementEvent(coords(0, 0), coords(0, 0), 1, new Date(1), "x");
  it("should work", function() {
    const result = e.toPojo();
    expect(result.id).toBe(1);
    expect(result.coords).toEqual(coords(0, 0));
    expect(result.oldCoords).toEqual(coords(0, 0));
    expect(result.date).toEqual(new Date(1));
    expect(result.message).toEqual(
      "map object moved to x: 0, y: 0 from x: 0, y: 0"
    );
    expect(result.type).toEqual(MOVEMENT_EVENT);
  });
});
