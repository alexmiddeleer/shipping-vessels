import MapObject from "./MapObject.js";

export default class Ship extends MapObject {
  #destinationPort;

  constructor(x, y, id, destPort) {
    super(x, y, id);
    this.#destinationPort = destPort;
  }

  get destinationPort() {
    return this.#destinationPort;
  }

  set destinationPort(port) {
    this.#destinationPort = port;
  }
}
