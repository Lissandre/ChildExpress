<template>
  <div class="w-full h-full">
    <canvas ref="gallery" id="_gallery" class="fixed top-0 w-full h-full"></canvas>
    <div ref="DOMContainer" class="absolute w-full flex flex-wrap justify-evenly z-50">
      <GalleryViewer v-for="(baby, index) in babies" :key="index" :index="index" :isLoading="isLoading"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GalleryContainer',
  data() {
    return {
      babies: ["","","","","","",""],
      isLoading: false,
    }
  },
  mounted() {
    if (this.$scene.assets.needsLoad) {
      this.isLoading = true
      this.$scene.assets.on('ressourcesReady', () => {
        this.$scene.init({
          canvas: this.$refs.gallery,
          DOMElements: this.$refs.DOMContainer
        })
        this.isLoading = false
      })
    } else if (!this.$scene.assets.needsLoad) {
      this.$scene.init({
        canvas: this.$refs.gallery,
        DOMElements: this.$refs.DOMContainer
      })
    }
  },
}
</script>