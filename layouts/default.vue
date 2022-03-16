<template>
  <div class="body">
    <canvas id="_canvas" class="fixed top-0 left-0 w-screen h-screen" ref="canvas"></canvas>
    <Nuxt class="z-10 absolute w-screen"/>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$scene.init(this.$refs.canvas)
  }
}
</script>