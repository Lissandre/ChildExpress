<template>
<<<<<<< HEAD
  <div>
    <div
      class="baby-container absolute left-1/2 top-1/2 z-[2] pointer-events-none"  
      style="width: 60%; height: 80%; transform: translate3d(-50%, -50%, 0)"
    >
      <canvas id="_canvas1" ref="canvas1" class="absolute "></canvas>
    </div>
    <div
      class="background-container absolute left-1/2 top-1/2 pointer-events-auto w-screen h-screen"
      style=" transform: translate3d(-50%, -50%, 0)"
    >
      <canvas
        id="_canvas2"
        ref="canvas2"
        class="absolute z-0"
        style="width: 100vw; height: 100vh"
      ></canvas>
=======
  <div class="h-full w-full flex items-center justify-center absolute top-0">
    <div class="baby-container w-2/3 h-4/5 relative">
      <canvas id="_canvas" ref="canvas"></canvas>
      <div class="h-full w-full flex justify-center items-center flex-col absolute top-0" v-if="isLoading">
        <div class="loader"></div>
      </div>
>>>>>>> 7ce2f8af6b853044b79ee943a2a13ef59ee60033
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false
    }
  },
  mounted() {
<<<<<<< HEAD
    this.$scene.assets.on('ressourcesReady', () => {
      this.$scene.init({ canvas: this.$refs.canvas1 })
    })
    this.$backgroundScene.assets.on('ressourcesReady', () => {
      this.$backgroundScene.init({ canvas: this.$refs.canvas2 })
    })
=======
    if(this.$scene.assets.needsLoad){
      this.isLoading = true
      this.$scene.assets.on('ressourcesReady', () => {
        this.$scene.init({ canvas: this.$refs.canvas })
        this.isLoading = false
      })
    }
    else {
      this.$scene.init({ canvas: this.$refs.canvas })
    }
>>>>>>> 7ce2f8af6b853044b79ee943a2a13ef59ee60033
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