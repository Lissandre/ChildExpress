<template>
  <div class="h-screen w-screen flex items-center justify-center">
    <nuxt-link :to="localePath({name: 'configuration-step', params: {step: 1}})" class="pointer-events-auto">Go to configuration</nuxt-link>
  </div>
</template>

<script>
import { useStore } from '@/stores/'

export default {
  name: 'Home',
  data() {
    return {}
  },
  setup() {
    const store = useStore()

    return { store }
  },
  mounted() {},
  methods: {},
}
</script>
