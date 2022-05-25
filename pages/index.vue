<template>
  <div>
    <LocaleSwitcher />
    <!--<Tutorial />-->
    <!--<Focus />-->
    <ProgressBar />
    <component :is="`Form${store.activeForm}`" />
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
    // this.store.changeActiveForm()
    setTimeout(() => {
      this.store.updateSubtitle('etape_type_variance')
    }, 3578)
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

/******** 
    Slider custom CSS 
********/

.tns-outer {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 10;
}

.tns-controls {
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  width: 70px;
  bottom: 50px;
  left: 50%;
  transform: translate3d(-50%, 0%, 0px);

}
.tns-controls button {
  content: '' !important;
  width: 20px;
  height: 20px;
  pointer-events: all;
  background: radial-gradient(
    rgba(0, 0, 0, 0),
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.8)
  );
  border-radius: 34px;
  position: relative;
}

.tns-controls button:not(:disabled) {
  width: 30px;
  height: 30px;
}

.tns-controls button:disabled {
  background: none;
}
.tns-controls button:disabled::after {
  content: '';
  position: absolute;
  display: block;
  height: 20px;
  width: 20px;
  border-radius: 100px;
  background-color: #0f54e4;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  box-shadow: 0px 4px 7px rgba(15, 84, 228, 0.56);
  filter: drop-shadow(0px 4px 7px rgba(15, 84, 228, 0.56));
}


#tns1-mw,
.tns-inner {
  width: 100%;
  height: 100%;
}

.my-slider {
  width: 100%;
  height: 100%;
}
</style>
