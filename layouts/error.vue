<template>
  <div class="flex items-center justify-center min-h-screen">
    <div >
      <h1 class="text-9xl font-black text-gray-300">{{ error.statusCode }}</h1>
      <span class="text-right block text-gray-500">{{ error.statusCode === 404 ? $t('error.notfound') : $t('error.else') }}</span>
    </div>
    <!-- <NuxtLink to="/">Home page</NuxtLink> -->
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error'
  }
</script>