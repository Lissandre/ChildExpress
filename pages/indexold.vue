<template>
  <div>
    <!--<Tutorial />-->
    <!-- <Focus /> -->
    <component :is="`Form${store.activeForm}`" />
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

<style>
/*
.test:hover fieldset {
  animation: linear 0.4s forwards translateX;
}

@keyframes translateX {
  0% {
    transform: translate3d(0%, 0, 0)  scale3d(0.9, 0.9 ,0.9);
  }
  50% {
    transform: translate3d(-25%, 0, 0);
  }
  100% {
    transform: translate3d(0%, 0, 0)  scale3d(1, 1, 1);
  }
} */
</style>
