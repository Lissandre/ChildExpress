<template>
  <div class="baby-container" style="width: 500px; height: 500px">
    <canvas id="_canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  setup() {},
  mounted() {
    this.$scene.assets.on('ressourcesReady', () => {
      this.$scene.init({ canvas: this.$refs.canvas })
    })
  },
}
</script>
