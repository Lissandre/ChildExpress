<template>
  <div>
    <h1>Reveal page</h1>
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
