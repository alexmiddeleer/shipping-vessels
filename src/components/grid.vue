<template>
  <!-- eslint-disable -->
  <div class="frame">
    <div v-for="row in gridState.rows">
      <span v-for="col in row">{{ col.type }}</span>
    </div>
  </div>
  <!-- eslint-enable -->
</template>

<script>
export default {
  name: "Grid",
  props: {
    gridState: Object
  }
};
</script>

<style scoped>
.frame {
  text-align: left;
  background-color: #0018c1;
  display: block;
}
</style>
