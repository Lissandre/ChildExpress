<template>
  <div class="h-full w-full flex items-center justify-center absolute top-0">
    <div class="baby-container w-2/3 h-4/5 relative">
      <canvas id="_canvas" ref="canvas"></canvas>
      <div class="h-full w-full flex justify-center items-center flex-col absolute top-0" v-if="isLoading">
        <div class="loader"></div>
      </div>
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