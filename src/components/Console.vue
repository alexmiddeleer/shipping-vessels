<template>
  <div class="console">
    <pre><!--
      --><code v-for="event in lastFiftyEvents" :key=event.id><!--
        -->{{event.date.toISOString()}}: {{event.message}}<br /><!--
      --></code><!--
    --></pre>
  </div>
</template>

<script>
import { registerDebugger } from "../lib/event-bus.js";

export default {
  name: "Console",
  data() {
    return {
      events: []
    };
  },
  computed: {
    lastFiftyEvents: function() {
      const count = Math.min(50, this.events.length);
      return this.events.slice(0 - count).reverse();
    }
  },
  created() {
    registerDebugger(e => {
      if (this.events.length >= 5000) {
        this.events.slice(1000);
      }
      this.events.push(e.detail);
    });
  }
};
</script>

<style scoped>
.console {
  text-align: left;
  background-color: gray;
  color: lightgray;
  max-height: 300px;
  overflow: scroll;
}
</style>
