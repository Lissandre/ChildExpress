<template>
  <div>
    <LocaleSwitcher />
    <!--<Tutorial />-->
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
  },
  methods: {},
}
</script>

<style>
fieldset {
  background: rgb(255, 255, 255);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0) 0%,
    rgba(210, 223, 238, 1) 100%
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
  transform:  rotate3d(0, 1, 0, 0) scale3d(1, 1, 1);
}


</style>
