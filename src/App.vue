<template>
  <div id="app">
    <Grid :grid-state="gridState" />
    <button :style="buttonStyles" @click="togglePause">
      <span v-if="paused">▶</span>
      <!--
      -->
      <span v-if="!paused">⏸</span>
    </button>
    <button :style="buttonStyles" @click="replay">Replay 🔃</button>
    <Console />
  </div>
</template>

<script>
import Grid from "./components/grid.vue";
import Console from "./components/Console.vue";
import GridState from "./lib/GridState";
import initEventLoop, { replayEvents } from "./lib/event-loop.js";
import initShipMovement from "./lib/ship-movement.js";

export default {
  name: "App",
  components: {
    Grid,
    Console
  },
  data: function() {
    return {
      gridState: new GridState(),
      paused: true,
      buttonStyles: { fontSize: "20px", padding: "20px" }
    };
  },
  created: function() {
    sessionStorage.clear();
    console.log("cleared session storage");
    initEventLoop(this);
    initShipMovement();
  },
  methods: {
    togglePause() {
      this.paused = !this.paused;
    },
    replay() {
      this.paused = true;
      this.gridState = new GridState();
      replayEvents();
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
