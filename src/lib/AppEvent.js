export const DEBUG_EVENT = "app-debug";

export default class AppEvent {
  constructor(type = DEBUG_EVENT, message = "debug event", date = new Date()) {
    this.date = date;
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

  static fromPojo(pojo = {}) {
    return new AppEvent(pojo.type, pojo.message, pojo.date);
  }
}
