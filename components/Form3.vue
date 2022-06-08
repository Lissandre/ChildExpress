<template>
  <div class="flex flex-col relative h-full w-full">
    <form @submit.prevent="prevent" class="h-full w-full" id="#form3">
      <component
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
    </form>

    <p style="left: 15%;" class="text-5xl text-white font-semibold z-[1] bottom-1/3 absolute roc" v-if="newJob === 'none'">
      {{ $t(`job.${this.newJob}`) }}
    </p>
    <p
      style="left: 15%;" class="text-5xl text-white font-semibold z-[1] bottom-1/3 absolute roc"
      v-else-if="newJob !== 'none' && jobs.length > 3"
    >
      {{ $t(`job.${this.newJob}`) }}
    </p>
    <p style="left: 15%;" class="text-5xl text-white font-semibold z-[1] bottom-1/3 absolute roc" v-else>
      {{ $t(`${this.newJob}`) }}
    </p>
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
    }
  },
  setup() {
    const store = useStore()
    return { store }
  },
  mounted() {
    this.inputs = form3.inputs

    this.soundEvents()
  },
  methods: {
    changeRange(id, e) {
      this.store.changeRange(id, e.target.value)
    },
    updateJob(value, fieldsetToUpdate) {
      // console.log('value : ', value, 'fieldsetToUpdate : ', fieldsetToUpdate)
      // console.log(this.inputs[name], this.inputs[name].value)
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
      this.$helpers.updateInput(e.type, e.type, e.type)
    },

    soundEvents() {
      requestAnimationFrame(() => {
        console.log('here')
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
.personality1, .personality2, .personality3, .personality4 {
  position: absolute;
  right: 10%;
}
.personality1{
  top: 40%;
}
.personality2{
  top: 50%;
}
.personality3{
  top: 60%;
}
.personality4{
  top: 70%;
}
</style>