<template>
  <div id="app">
    <Grid />
    <Console style="display:none" :events="events" />
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Grid from "./components/grid.vue";
import Console from "./components/Console.vue";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  name: "app",
  data: function() {
    return {
      events: []
    };
  },
  components: {
    HelloWorld,
    Grid,
    Console
  },
  created: async function() {
    // eslint-disable-next-line
    while (this.events.length < 5000) {
      this.events.push({
        date: new Date(),
        type: "debug",
        message: "just a test"
      });
      await sleep(1000);
    }
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
