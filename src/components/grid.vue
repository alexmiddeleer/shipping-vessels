<template>
  <!-- eslint-disable -->
  <div class="frame">
    <div v-for="row in rows">
      <span v-for="col in row">{{ col.char }}</span>
    </div>
  </div>
  <!-- eslint-enable -->
</template>

<script>
export default {
  name: "Grid",
  data: function() {
    const rows = [];
    const numRows = 5;
    const numCols = 5;
    for (let i = 0; i < numRows; i++) {
      rows.push([]);
      for (let j = 0; j < numCols; j++) {
        rows[i].push({
          char: i == 0 && j == 0 ? "🚢" : "🌊"
        });
      }
    }

    return {
      rows
    };
  },
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
