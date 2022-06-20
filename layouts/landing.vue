<template>
  <div>
    <Header />
    <Background :dark="$route.name.includes('landing') ? false : true" />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
export default {
}
</script>

<style>
.container {
  max-width: 1920px;
  margin: 0 auto;
}
/* html{scroll-behavior:smooth} */
</style>
