<template>
  <p class="absolute bottom-2 left-1/2 text-white z-[10]" v-if="isDisplayed"> {{ currentSubtitle }}</p>
</template>

<script>
import { useStore } from '@/stores'
import Sounds from '@/helpers/sounds'
import subtitle_fr from '@/locales/fr/subtitles.json'
import subtitle_en from '@/locales/en/subtitles.json'

export default {
  name: 'Subtitle',
  data() {
    return {
      currentSubtitle: '',
      isDisplayed: false,
      subtitles: {
        'fr': subtitle_fr,
        'en': subtitle_en
      },
      audioPath: '/sounds'
    }
  },
  setup() {
    const store = useStore()
    return { store }
  },
  mounted() {
    this.sounds = new Sounds({store: this.store})

    this.store.$onAction(({ name, store, args, after, onError }) => {
      if (name !== 'updateSubtitle') return
      console.log('suss');
      after((result) => {
        this.isDisplayed = true
        const subtitleName = store.subtitle
        this.currentSubtitle = this.subtitles[this.$i18n.locale][subtitleName]
        this.currentAudioPath = `${this.audioPath}/${this.$i18n.locale}/${subtitleName}.mp3`

        const currentAudio = new Audio(this.currentAudioPath)
        currentAudio.addEventListener('canplaythrough', () => {
          currentAudio.play()
        }, { once: true })
        currentAudio.addEventListener('ended', () => {
          setTimeout(() => {
            this.isDisplayed = false;
          }, 1000);
        }, { once: true })
      })
    })
  },
  methods: {
  },
}
</script>


<style scoped>
 p {
  transform: translate3d(-50%, 0, 0);
}
</style>