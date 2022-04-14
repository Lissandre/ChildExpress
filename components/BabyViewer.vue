<template>
  <div>
    <div
      class="baby-container absolute left-1/2 top-1/2 z-[2] pointer-events-none"  
      style="width: 60%; height: 80%; transform: translate3d(-50%, -50%, 0)"
    >
      <canvas id="_canvas1" ref="canvas1" class="absolute "></canvas>
    </div>
    <div
      class="background-container absolute left-1/2 top-1/2 pointer-events-auto"
      style="width: 60%; height: 80%; transform: translate3d(-50%, -50%, 0)"
    >
      <canvas
        id="_canvas2"
        ref="canvas2"
        class="absolute z-0"
        style="width: 100vw; height: 100vh"
      ></canvas>
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
  mounted() {
    this.$scene.assets.on('ressourcesReady', () => {
      this.$scene.init({ canvas: this.$refs.canvas1 })
    })
    this.$backgroundScene.assets.on('ressourcesReady', () => {
      this.$backgroundScene.init({ canvas: this.$refs.canvas2 })
    })
  },
}
</script>
