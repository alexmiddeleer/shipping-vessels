import MovementEvent, { MOVEMENT_EVENT } from "./MovementEvent.js";
import TickEvent, { TICK_EVENT } from "./TickEvent.js";
import InitEvent, { INIT_EVENT } from "./InitEvent.js";
import AppEvent from "./AppEvent.js";

const map = {};
map[MOVEMENT_EVENT] = MovementEvent;
map[TICK_EVENT] = TickEvent;
map[INIT_EVENT] = InitEvent;

export default function(pojo) {
  if (map[pojo.type]) {
    return map[pojo.type].fromPojo(pojo);
  }
  return AppEvent.fromPojo(pojo);
}
