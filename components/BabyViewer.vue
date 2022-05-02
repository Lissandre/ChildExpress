<template>
  <div>
    <div
      class="baby-container absolute left-1/2 top-1/2 z-[2] pointer-events-none"
      style="width: 60%; height: 80%; transform: translate3d(-50%, -50%, 0)"
    >
      <canvas id="_canvas1" ref="canvas1" class="absolute"></canvas>
    </div>
    <div
      class="
        background-container
        absolute
        left-1/2
        top-1/2
        pointer-events-auto
        w-screen
        h-screen
      "
      style="transform: translate3d(-50%, -50%, 0)"
    >
      <canvas
        id="_canvas2"
        ref="canvas2"
        class="absolute z-0"
        style="width: 100vw; height: 100vh"
      ></canvas>
      <div
        class="
          h-full
          w-full
          flex
          justify-center
          items-center
          flex-col
          absolute
          top-0
        "
        v-if="isLoading"
      >
        <div class="loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    }
  },
  mounted() {
    this.$scene.setCanvas(this.$refs.canvas1)
    if (this.$backgroundScene.assets.needsLoad) {
      this.isLoading = true
      this.$backgroundScene.assets.on('ressourcesReady', () => {
        this.$backgroundScene.init({ canvas: this.$refs.canvas2 })
        this.isLoading = false
      })
    } else {
      this.$backgroundScene.init({ canvas: this.$refs.canvas2 })
    }
  },
}
</script>

<style>
.loader {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #000000;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>