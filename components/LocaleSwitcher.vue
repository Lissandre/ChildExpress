<template>
  <div class="absolute p-4 z-50 pointer-events-auto">
    <nuxt-link :to="switchLocalePath(locale[0].code)" class="uppercase">{{
      locale[0].code
    }}</nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'LocaleSwitcher',
  computed: {
    locale() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },
}
</script>
