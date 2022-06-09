<template>
  <p class="absolute bottom-2 left-1/2 text-white z-[10]" v-if="isDisplayed">
    {{ currentSubtitle }}
  </p>
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
      alreadyPlayed: [],
      subtitles: {
        fr: subtitle_fr,
        en: subtitle_en,
      },
      audioPath: '/sounds',
    }
  },
  setup() {
    const store = useStore()
    return { store }
  },

  // Chose que l'on doit prendre en compte :
  // On lance la voix si l'audio n'est pas déjà en train d'être joué.
  // A la fin de chaque audio, on stock son ID dans un tableau (ou string ou whatever)
  // et à chaque début d'audio, on check si cet ID n'est pas déjà présent dans le tableau (pour ne jamais jouer 2 fois le même son)
  // On utilise un peu de random pour les variations
  mounted() {
    this.sounds = new Sounds({ store: this.store })

    this.store.$onAction(({ name, store, args, after, onError }) => {
      // On passe à la suite si l'action est bien updateSubtitle, si l'audio n'est pas en train de jouer
      if (
        name !== 'updateSubtitle' ||
        (this.currentAudio && this.isPlaying(this.currentAudio))
      )
        return
      console.log('suss')
      after((result) => {
        if (this.hasAlreadyBeenPlayed(store.subtitle)) return
        this.isDisplayed = true
        const subtitleName = store.subtitle
        this.currentSubtitle = this.subtitles[this.$i18n.locale][subtitleName]
        this.currentAudioPath = `${this.audioPath}/${this.$i18n.locale}/${subtitleName}.mp3`

        // Pour certaines variations (celles avec plus d'une variation), on peut rajouter un id genre _1, _2 à la fin des audios, et faire une fonction qui donnera du random dans ceux qui n'ont pas déjà été joués
        this.currentAudio = new Audio(this.currentAudioPath)
        this.currentAudio.addEventListener(
          'canplaythrough',
          () => {
            this.currentAudio.play()
            this.alreadyPlayed.push(subtitleName)
          },
          { once: true }
        )
        this.currentAudio.addEventListener(
          'ended',
          () => {
            setTimeout(() => {
              this.isDisplayed = false
              if (store.subtitle.includes('speech'))
                this.nextSpeech(store.subtitle)
            }, 1000)
          },
          { once: true }
        )
      })
    })
  },
  methods: {
    isPlaying(audioElement) {
      return !audioElement?.paused
    },

    hasAlreadyBeenPlayed(id) {
      return this.alreadyPlayed.includes(id)
    },
    nextSpeech(subtitle) {
      const step = subtitle.split('_')[0]
      const name = subtitle.split('_')[1]
      const next = subtitle.split('_')[2].replace(/.$/, '2')
      this.$nuxt.$emit('updateSound', step, 'speech', name, next)
    },
  },
}
</script>


<style scoped>
p {
  transform: translate3d(-50%, 0, 0);
  text-align: center;
}
</style>