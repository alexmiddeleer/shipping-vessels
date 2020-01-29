<template>
  <div id="app">
    <Grid :gridState="gridState" />
    <button :style="buttonStyles" v-on:click="togglePause">
      Toggle Pause <span v-if="paused">(Currently Paused)</span>
    </button>
    <Console />
  </div>
</template>

<script>
import Grid from "./components/grid.vue";
import Console from "./components/Console.vue";
import GridState from "./lib/GridState";
import initAppState from "./lib/app-state.js";

export default {
  name: "app",
  data: function() {
    return {
      gridState: new GridState(),
      paused: false,
      buttonStyles: { fontSize: "20px", padding: "20px" }
    };
  },
  components: {
    Grid,
    Console
  },
  created: function() {
    setTimeout(function() {
      initAppState(this);
    }, 10);
  },
  methods: {
    togglePause() {
      this.paused = !this.paused;
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
