<template>
  <div class="viewer h-[350px] w-[350px] flex justify-center items-end m-8">
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
    }
  },
  data() {
    return {
      name: `Baby - ${this.index}`
    }
  },
}
</script>