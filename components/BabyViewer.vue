<template>
  <div
    class="baby-container absolute left-1/2 top-1/2 pointer-events-auto"
    style="width: 60%; height: 80%; transform: translate3d(-50%, -50%, 0)"
  >
    <canvas id="_canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  setup() {},
  mounted() {
    this.$scene.assets.on('ressourcesReady', () => {
      console.log('sa grand mère suce de')
      this.$scene.init({ canvas: this.$refs.canvas })
    })
  },
}
</script>
