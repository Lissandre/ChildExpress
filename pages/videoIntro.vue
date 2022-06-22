<template>
  <div class="relative">
    <iframe
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/1kF2r46EHuM?autoplay=1?controls=1&vq=hd720"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      autoplay="1"
      controls="0"
    ></iframe>
    <div class="fadewhite" ref="fadewhite"></div>
  </div>
</template>

<script>
import { useStore } from '@/stores'
import gsap from 'gsap'
export default {
  name: 'videointro',
  nuxtI18n: {
    paths: {
      en: '/videointro',
      fr: '/videointro',
    },
  },
  data() {
    return {
      currentSubtitle: '',
    }
  },
  setup() {
    const store = useStore()
    return { store }
  },
  mounted() {
    gsap.to(this.$refs.fadewhite, {
      opacity: 0,
      duration: 1,
    })
    setTimeout(() => {
      gsap
        .to(this.$refs.fadewhite, {
          opacity: 1,
          duration: 1,
        })
        .then(() => {
          if (this.$i18n.locale === 'fr') {
            this.$router.push('/fr/personnalisation')
          } else {
            this.$router.push('/en/customization')
          }
        })
    }, 62000)
  },
  methods: {},
}
</script>

<style>
.player .vp-controls-wrapper,
.player .vp-video-wrapper,
.player .vp-controls-wrapper {
  display: none !important;
}

.fadewhite {
  z-index: 10000;
  opacity: 1;
  background: white;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  position: fixed;
  top: 0;
}
</style>
