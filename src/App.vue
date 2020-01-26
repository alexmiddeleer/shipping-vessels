<template>
  <div id="app">
    <Grid :gridState="gridState" />
    <Console />
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Grid from "./components/grid.vue";
import Console from "./components/Console.vue";
import GridState from "./lib/GridState";
import startEventLoop from "./lib/app-state";

export default {
  name: "app",
  data: function() {
    return {
      gridState: new GridState()
    };
  },
  components: {
    HelloWorld,
    Grid,
    Console
  },
  created: function() {
    startEventLoop();
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
