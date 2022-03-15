import Vue from 'vue';
import App from '@/scene';

if (process.browser) {
  window.onNuxtReady(() => {
    const Scene = new App({
      canvas: document.querySelector('#_canvas'),
    })

    Vue.use(Scene)
  })
}