<template>
  <div class="viewer relative h-[350px] w-[350px] flex justify-center items-end m-8">
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
}
</script>