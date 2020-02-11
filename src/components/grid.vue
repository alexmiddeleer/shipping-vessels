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
  display: inline-block;
  border: 5px solid lightblue;
  border-radius: 10px;
}
</style>
