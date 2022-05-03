<template>
  <div>
    <!--<Tutorial />-->
    <!-- <Focus /> -->
    <component :is="`Form${$route.params.step}`" />
  </div>
</template>

<script>
import { useStore } from '@/stores/'

export default {
  name: 'Home',
  data() {
    return {
      step: Number(this.$route.params.step)
    }
  },
  setup() {
    const store = useStore()

    return { store }
  },
  mounted() {
    this.store.changeActiveForm(this.step)
  },
  methods: {},
}
</script>

<style>
fieldset {
  background: radial-gradient(rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.6));
  background: radial-gradient(
    rgba(0, 0, 0, 0),
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.8)
  );
  transition: all ease-out 0.5s;
  filter: blur(2px);
  z-index: 1;
  perspective-origin: 500% 200%;
  /*transform: perspective(800px) rotate3d(0, 1, 0, -45deg) scale3d(0.9, 0.9, 0.9);*/
  transform: scale3d(0.9, 0.9, 0.9);
  border-radius: 34px;
  position: absolute;
  padding: 20px;
}

div fieldset:hover {
  filter: blur(0px);
  z-index: 3;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  transform: scale3d(1, 1, 1);
}
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
