<template>
  <div>
    <LocaleSwitcher />
    <!-- <Tutorial /> -->
    <Focus />
    <ProgressBar />
    <Form1 v-if="store.activeForm === 1" />
    <Form2 v-if="store.activeForm === 2" />
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
  mounted() {
    // this.activeForm = getActiveForm()
  },
  methods: {},
}
</script>
