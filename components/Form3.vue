<template>
  <div class="flex flex-col relative h-full w-full">
    <form @submit.prevent="prevent" class="h-full w-full" id="#form3">
      <div class="personality">
        <component
          v-if="!input.class.includes('xtra-component')"
          v-for="(input, name, fieldsetIndex) in inputs"
          :key="input.name"
          :fieldsetIndex="fieldsetIndex"
          :is="input.component"
          :input="input"
          v-on:updateInput="
            (type, name, value, optional) =>
              inputChange(type, name, value, optional)
          "
          v-on:updateJob="
            (value, fieldsetToUpdate) => updateJob(value, fieldsetToUpdate)
          "
          v-on:updateIQ="(value) => updateIQ(value)"
          :locale="
            $t(
              `form3.${slugify(`${input.type}_${input.name}`, {
                replacement: '_',
                lower: true,
              })}`
            )
          "
        ></component>
      </div>
      <div class="xtra_wrapper" ref="xtraWrapper">
        <div class="xtra_blur" ref="xtraBlur">
          <h2 class="xtra-title neueBit">X-TRA</h2>
          <h2 class="xtra-description neueBit">
            Quelle(s) option(s) pour votre bébé ?
          </h2>
          <h2 class="xtra-subdescription">(Le nombre n'est pas limité)</h2>
          <div class="xtra_components">
            <component
              v-if="input.class.includes('xtra-component')"
              v-for="(input, name, fieldsetIndex) in inputs"
              :key="input.name"
              :fieldsetIndex="fieldsetIndex"
              :is="input.component"
              :input="input"
              v-on:updateInput="
                (type, name, value, optional) =>
                  inputChange(type, name, value, optional)
              "
              :locale="
                $t(
                  `form3.${slugify(`${input.type}_${input.name}`, {
                    replacement: '_',
                    lower: true,
                  })}`
                )
              "
            ></component>
          </div>
        </div>
        <div class="progress-bar-container" ref="progressContainer">
          <div class="progress-bar-indicator"></div>
        </div>
      </div>
    </form>

    <div class="fieldJob absolute bottom-1/3 z-[1]" style="left: 15%">
      <p class="text-5xl text-white font-semibold roc" v-if="newJob === 'none'">
        {{ splitJob($t(`job.${this.newJob}`), true) }}
        <span class="text-3xl neueBit block">{{
          splitJob($t(`job.${this.newJob}`), false)
        }}</span>
      </p>
      <p
        class="text-5xl text-white font-semibold roc"
        v-else-if="newJob !== 'none' && jobs.length > 3"
      >
        {{ splitJob($t(`job.${this.newJob}`), true) }}
        <span class="text-3xl neueBit block">{{
          splitJob($t(`job.${this.newJob}`), false)
        }}</span>
      </p>
      <p class="text-5xl text-white font-semibold roc" v-else>
        {{ splitJob($t(`${this.newJob}`), true) }}
        <span class="text-3xl neueBit block">{{
          splitJob($t(`job.${this.newJob}`), false)
        }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/stores/'
import { form3 } from '@/data/forms.json'
import slugify from 'slugify'

export default {
  name: 'Form3',
  data() {
    return {
      name: 'form3',
      inputs: [],
      slugify: slugify,
      jobs: new Array(),
      newJob: 'none',
      blurry: true,
      xtra_selected: false,
    }
  },
  setup() {
    const store = useStore()
    return { store }
  },
  mounted() {
    this.inputs = form3.inputs

    this.xtraBlur = this.$refs.xtraBlur
    this.xtraWrapper = this.$refs.xtraWrapper

    this.soundEvents()
    /*
      requestAnimationFrame(() => {
        if (this.$nuxt.$scene.assets.needsLoad) {
      this.$nuxt.$scene.assets.on('ressourcesReady', () => {
        this.$nuxt.$scene.init()
      })
        })
    }
        */
  },
  methods: {
    changeRange(id, e) {
      this.store.changeRange(id, e.target.value)
    },
    updateJob(value, fieldsetToUpdate) {
      this.jobs[fieldsetToUpdate] = value

      // Quickfix, trouver un moyen d'update les locales ailleurs ? Sinon rajouter un if locale fr/en
      switch (fieldsetToUpdate) {
        case 0:
          if (value === 0) this.newJob = 'Agent immobilier metaverse'
          else this.newJob = 'Maçon de base spatiale'
          break
        case 1:
          if (value === 0) this.newJob = 'Rappeur cosmique'
          else this.newJob = 'Arnaqueur de Tindeur'
          break
        case 2:
          if (value === 0) this.newJob = 'Musicien VR'
          else this.newJob = 'Ingénieur dans les collants indestructibles'
          break
      }

      /*QI très haut/bas (+ de 150 et - de 30) : sans-abris
intelligent (100 et 160) : Médecin de robot
Bête (entre 30 et 80) : Influenceur dans la pantoufle*/
      if (!this.jobs.includes(undefined) && this.jobs.length === 4) {
        this.newJob = this.jobs.join('')
        $nuxt.$emit('updateSound', 'form3', 'radio', 'personality', this.newJob)
      }
    },
    updateIQ(value) {
      if (value > 160 || value < 30) {
        this.newJob = 'Sans-abris'
      } else if (value > 100 && value < 160) {
        this.newJob = 'Médecin de robot'
      } else if (value > 30 && value < 80) {
        this.newJob = 'Influenceur dans la pantoufle'
      }

      if (value !== 100 && this.blurry === true) {
        window.clearTimeout(this.timeout)

        this.timeout = window.setTimeout(() => {
          this.blurry = false
          const blurrys = document.querySelectorAll('.blurry')
          blurrys.forEach((blur) => {
            blur.classList.remove('blurry')
            blur.classList.add('animate-unblur')
          })
          $nuxt.$emit(
            'updateSound',
            'form3',
            'speech',
            'personality',
            'speech1'
          )
        }, 5000)
      }
    },
    prevent(e) {
      e.preventDefault()
      if (this.xtra_selected) {
        this.xtraBlur.classList.add('hide')
        setTimeout(() => {
          $nuxt.$emit('updateSound', 'form3', 'speech', 'loading', 'speech1')
          const indicator = document.querySelector('.progress-bar-indicator')
          indicator.classList.add('animate-progressbargrow')

          this.$refs.progressContainer.classList.add('border')
          this.store.changeJob($nuxt.$t(`job.${this.newJob}`))
        }, 1000)

        setTimeout(() => {
          this.$refs.progressContainer.classList.remove('border')
        }, 7000)

        setTimeout(() => {
          this.$helpers.updateInput(e.type, e.type, e.type)
        }, 8000)
      } else {
        this.xtraWrapper.classList.add('openPopin')
        const xtraComponents = document.querySelectorAll('.xtra-component')
        xtraComponents.forEach((xtra) => {
          xtra.classList.remove('animate-bounce-in')
          xtra.classList.add('animate-bounce-in')
        })

        $nuxt.$emit('updateSound', 'form3', 'speech', 'xtra', 'speech1')
        this.xtra_selected = true
      }
    },

    splitJob(string, isFirstWord) {
      if (isFirstWord) {
        return string.split(' ')[0]
      } else {
        return this.removeFirstWord(string)
      }
    },

    removeFirstWord(str) {
      const indexOfSpace = str.indexOf(' ')

      if (indexOfSpace === -1) {
        return ''
      }

      return str.substring(indexOfSpace + 1)
    },
    soundEvents() {
      requestAnimationFrame(() => {
        if ($nuxt)
          $nuxt.$emit('updateSound', 'form3', 'speech', 'intro', 'speech1')
      })
    },

    inputChange(type, name, value, optional) {
      this.$helpers.updateInput(type, name, value)
      if (type === 'roundSlider') {
        value = value / optional
      }
      if (this.jobs.length === 4) return

      $nuxt.$emit('updateSound', 'form3', type, name, value)
    },
  },
}
</script>

<style>
.fieldJob {
  border: 1px solid white;
  border-radius: 34px;
  padding: 40px 100px 40px 40px;
}
.personality1,
.personality2,
.personality3,
.personality4 {
  position: absolute;
  right: 10%;
  width: 600px !important;

}
.personality1 {
  top: 40%;
}
.personality2 {
  top: 50%;
}
.personality3 {
  top: 60%;
}
.personality4 {
  top: 70%;
}

.xtra_wrapper {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  backdrop-filter: blur(0px);
  visibility: hidden;
  opacity: 0;
  color: white;
  transition: all ease 0.5s;
}

.xtra_blur {
  width: 700px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  transition: all ease 0.5s;
}

.xtra_components {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.xtra-checkbox {
  width: 300px !important;
  justify-content: space-around;
}

.xtra_components > .submit-wrapper {
  position: relative;
  top: 50px;
  left: 0;
}
.xtra-title,
.xtra-description,
.xtra-subdescription {
  text-align: center;
}
.xtra-title {
  font-size: 62px;
  margin-bottom: 20px;
}

.xtra-description {
  font-size: 42px;
}

.xtra-subdescription {
  font-size: 22px;
  margin-bottom: 20px;
}

.openPopin {
  backdrop-filter: blur(10px) contrast(30%);
  visibility: visible;
  opacity: 1;
}

.hide {
  opacity: 0;
}

.progress-bar-container {
  margin: 50px 0px;
  position: absolute; /* relative here */
  height: 30px;
  border-radius: 34px;
  bottom: 10%;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  width: 800px;
}

.border {
  border: 1px solid white;
}

.progress-bar-indicator {
  height: 100%;
  border-radius: 25px;
  /* this will do the magic */
  -webkit-mask: linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0);
  transition: all ease 0.5s;
  width: 0%;
}
.progress-bar-indicator::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(to right, white, white, transparent);
}
</style>
