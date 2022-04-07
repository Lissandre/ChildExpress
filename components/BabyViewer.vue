<template>
  <div class="baby-container absolute left-1/2 top-1/2" style="width: 75%; height: 50%; transform: translate3d(-50%, -50%, 0)">
    <canvas id="_canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  setup() {},
  mounted() {
    this.$scene.assets.on('ressourcesReady', () => {
      console.log(this.$refs.canvas)
      this.$scene.init({ canvas: this.$refs.canvas })
    })
  },
}
</script>
