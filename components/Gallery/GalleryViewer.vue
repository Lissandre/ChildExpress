<template>
  <div ref="viewer" class="viewer relative w-1/4 inline-flex justify-center items-end">
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
    <span>{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: 'GalleryViewer',
  props: {
    index: {
      type: Number,
      default: 0
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      name: `Baby - ${this.index}`
    }
  },
  mounted() {
    this.$refs.viewer.style.height = this.$refs.viewer.offsetWidth + 'px'
    window.addEventListener('resize', () => {
      this.$refs.viewer.style.height = this.$refs.viewer.offsetWidth + 'px'
    })
  }
}
</script>