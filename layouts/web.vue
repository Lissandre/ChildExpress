<template>
  <div class="body">
    <Nuxt class="z-10 w-full h-screen absolute"/>
  </div>
</template>

<script>
export default {
  methods: {
    setViewHeight: function() {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    },
  },
  mounted() {
    this.setViewHeight()
    window.addEventListener('resize', () => {
      this.setViewHeight()
    })
  },
}
</script>