<template>
  <div class="w-full h-full">
    <canvas ref="gallery" id="_gallery" class="fixed top-0 w-full h-full"></canvas>
    <div ref="DOMContainer" class="absolute w-full z-40 gallery">
      <GalleryViewer v-for="(baby, index) in babies" :key="index" :index="index" :isLoading="isLoading"/>
    </div>
    <button @click="addBabies()" class="fixed bottom-0 z-50 p-3 bg-black text-white">Load More Babies</button>
  </div>
</template>

<script>
export default {
  name: 'GalleryContainer',
  data() {
    return {
      babies: 8,
      isLoading: false,
    }
  },
  methods: {
    addBabies() {
      this.babies += 8
      this.$nextTick(() => {
        const viewers = [...this.$refs.DOMContainer.querySelectorAll('.viewer')]
        const newViewers = viewers.splice(viewers.length - 8, viewers.length - 1)
        this.$scene.addScenes(newViewers)
      })
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

<style lang"scss">
.gallery {
  display: grid; /* 1 */
  grid-template-columns: repeat(auto-fill, 100px); /* 2 */
  grid-gap: 1rem; /* 3 */
  justify-content: space-between; /* 4 */
}
</style>