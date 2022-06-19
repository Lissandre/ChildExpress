<template>
    <audio id="myAudio">
    <source type="audio/mpeg" class="neon" autoplay>
    </audio>
</template>

<script>
import { useStore } from '@/stores'
import {Howl, Howler} from 'howler';

export default {
  name: 'AmbiantSound',
  data() {
    return {
    }
  },
  setup() {
    const store = useStore()
    return { store }
  },
  mounted() {
      let relax = new Howl({
        volume: 0.3,
        autoplay: true,
        loop: true,
        src: ['/sounds/ambiant/relax.mp3']
      });

      relax.play();
      let neon = new Howl({
        volume: 0.5,
        loop: true,
        src: ['/sounds/ambiant/neon.mp3']
      });


    // const ambiant2 = new Audio('/sounds/ambiant/neon.mp3')
    // ambiantNeon.autoplay = true

    this.store.$onAction(({ name, store, args, after, onError }) => {
      if(name === 'changeActiveForm' ) {
        after(
          (result) => {
        if(this.store.activeForm == 4) {
          relax.fade(0.3, 0, 2000)
          neon.play();
          neon.fade(0, 0.3, 2000)
        }
        })
    }
    })
  },
  methods: {
  },
}
</script>