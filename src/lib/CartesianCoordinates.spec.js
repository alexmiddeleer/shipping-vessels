import CartesianCoordinates from "./CartesianCoordinates.js";
describe("CartesianCoordinates", function() {
  it("fromPojo", function() {
    expect(CartesianCoordinates.fromPojo({ x: 0, y: 1 })).toBeInstanceOf(
      CartesianCoordinates
    );
    expect(CartesianCoordinates.fromPojo({ x: 0, y: 1 }).x).toBe(0);
    expect(CartesianCoordinates.fromPojo({ x: 0, y: 1 }).y).toBe(1);
  });
});
