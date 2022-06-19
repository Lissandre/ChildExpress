<template>
  <div class="container overflow-x-hidden">
    <h1>Reveal page</h1>
  <Chatbot />
  </div>
</template>

<script>
export default {
  name: 'Reveal',
  layout: 'landing',
  nuxtI18n: {
    paths: {
      en: '/oops',
      fr: '/mince',
    },
  },
}
</script>

