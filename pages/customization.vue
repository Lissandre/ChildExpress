<template>
  <div>
    <LocaleSwitcher />
    <!--<Tutorial />-->
    <!--<Focus />-->
    <div class="littleLogo top-2 left-2"></div>
    <ProgressBar />
    <component :is="`Form${store.activeForm}`" />
    <BabyViewer />

    <AmbiantSound />
  </div>
</template>

<script>
import { useStore } from '@/stores/'

export default {
  name: 'Custom',
  nuxtI18n: {
    paths: {
      en: '/customization',
      fr: '/personnalisation',
    },
  },
  data() {
    return {}
  },
  setup() {
    const store = useStore()

    return { store }
  },
  mounted() {
    // this.store.changeActiveForm()
    // setTimeout(() => {
    //   this.store.updateSubtitle('etape_type_variance')
    // }, 3578)
  },
  methods: {},
}
</script>

<style>
fieldset {
  box-shadow: inset 0px 12px 20px rgba(255, 255, 255, 0.86),
    inset -5px -4.5px 6.5px rgba(255, 255, 255, 0.7);
  transition: all ease-out 0.5s;
  z-index: 1;
  perspective-origin: 500% 200%;
  /*transform: perspective(800px) rotate3d(0, 1, 0, -45deg) scale3d(0.9, 0.9, 0.9);*/

  border-radius: 34px;
  position: absolute;
  padding: 20px;
  font-family: 'roc-grotesk';
  /*filter: blur(0px);*/
}

div fieldset:hover {
  z-index: 3;
  /* -webkit-backdrop-filter: blur(10px); */
  /* backdrop-filter: blur(10px); */
}

fieldset > label,
fieldset > input[type='submit'],
.text-wrapper,
.counter-wrapper {
  font-size: 16px;
}
/*

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
  bottom: 100px;
  left: 50%;
  transform: translate3d(-50%, 0%, 0px);
  z-index: 1000;
}
.tns-controls button {
  content: '' !important;
  width: 15px;
  height: 15px;
  pointer-events: all;
  background: radial-gradient(
    rgba(0, 0, 0, 0),
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.8)
  );
  border-radius: 34px;
  position: relative;
  transition: all ease 0.5s;
}

.tns-controls button:not(:disabled) {
  width: 27px;
  height: 27px;
}
.tns-controls button:not(:disabled):hover {
  transform: scale3d(1.3,1.3,1.3);
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

.tns-liveregion{
  display: none;
}

#tns1-mw,
.tns-inner {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}

.my-slider {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}

.first-slide,
.second-slide {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
}

.neueBit {
  font-family: 'NeueBit';
}

.blurry {
  transform: scale(0.9) !important;
  filter: blur(2px);
  transition: all ease-out 0.5s;
  pointer-events: none;
}

.roc {
  font-family: 'roc-grotesk';
}

.w-fit {
  width: fit-content;
}

.light-background {
  border-radius: 40px !important;
  box-shadow: inset 0px 3.5px 21px rgba(255, 255, 255, 0.86) !important;
}
.weight,
.weight button {
  box-shadow: inset 0px 12px 20px rgba(255, 255, 255, 0.86),
    inset -5px -4.5px 6.5px rgba(255, 255, 255, 0.7) !important;
}

.weight {
  border-radius: 80px !important;
}

.weight .content {
  flex-direction: row !important;
  margin: 0 20px;
}

.littleLogo {
  background: no-repeat center center url('@/assets/images/littleLogo.png');
  position: absolute;
  width: 100px;
  height: 100px;
  top: 10px;
  left: 50px;
  z-index: 1;

}
</style>
