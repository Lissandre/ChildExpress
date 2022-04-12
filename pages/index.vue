<template>
  <div>
    <LocaleSwitcher />
    <Tutorial />
    <Focus />
    <ProgressBar />
    <component :is="`Form${store.activeForm}`"/>
    <BabyViewer />
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
