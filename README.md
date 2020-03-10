# shipping-vessels

A toy project experimenting with an event-based architecture.

Things I learned:

1. This pattern is pretty tricky
2. serializing and deserializing class instances is
   a pain, at least the `fromPojo` manual way I used.
3. Robust tests are critical since this pattern is tough to debug.
4. Replaying events is especially tough. Events that initialize need to
   be skipped, and events that trigger other events are a pain. This
   requires more research.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```
