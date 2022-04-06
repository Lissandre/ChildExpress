<template>
  <div>
    <LocaleSwitcher />
    <Tutorial />
    <Form1 v-if="store.activeForm === 1" />
    <Form2 v-if="store.activeForm === 2" />
  </div>
</template>

<script>
import { useStore } from '../store/main'

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
