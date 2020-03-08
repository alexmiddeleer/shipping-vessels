export const DEBUG_EVENT = "app-debug";

export default class AppEvent {
  constructor(type = DEBUG_EVENT, message = "debug event") {
    this.date = new Date();
    this.type = type;
    this.message = message;
  }

  toPojo() {
    return {
      date: this.date,
      type: this.type,
      message: this.message
    };
  }

  toJson() {
    return JSON.stringify(this.toPojo());
  }
}
