<template>
  <div class="flex flex-col relative h-full w-full ">

    <form @submit.prevent="prevent">
      <component
        v-for="(input, name, fieldsetIndex) in inputs"
        :key="input.name"
        :fieldsetIndex="fieldsetIndex"
        :is="input.component"
        :input="input"
        v-on:updateInput="
          (type, name, value) => $helpers.updateInput(type, name, value)
        "
        v-on:updateJob="
          (value, fieldsetToUpdate) => updateJob(value, fieldsetToUpdate)
        "
        v-on:updateIQ="
        (value) => updateIQ(value)"
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

    <h2>Métier :</h2>
    <p class="text-5xl text-white font-semibold z-[1]" v-if="newJob === 'none'">{{ $t(`job.${this.newJob}`) }}</p>
    <p class="text-5xl text-white font-semibold z-[1]" v-else-if="newJob !== 'none' && (jobs.length > 3)">{{ $t(`job.${this.newJob}`) }}</p>
    <p class="text-5xl text-white font-semibold z-[1]" v-else >{{ $t(`${this.newJob}`) }}</p>
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
    }
  },
  setup() {
    const store = useStore()
    return { store }
  },
  mounted() {
    this.inputs = form3.inputs
  },
  methods: {
    changeRange(id, e) {
      this.store.changeRange(id, e.target.value)
    },
    updateJob(value, fieldsetToUpdate) {
      console.log('value : ', value, 'fieldsetToUpdate : ',fieldsetToUpdate)
      // console.log(this.inputs[name], this.inputs[name].value)
      this.jobs[fieldsetToUpdate] = value


      // Quickfix, trouver un moyen d'update les locales ailleurs ? Sinon rajouter un if locale fr/en
      switch(fieldsetToUpdate) {
        case 0:
          if(value === 0) this.newJob = 'Agent immobilier metaverse'
          else this.newJob = 'Maçon de base spatiale'
        break;
        case 1:
          if(value === 0) this.newJob = 'Rappeur cosmique'
          else this.newJob = 'Arnaqueur de Tindeur'
        break;
        case 2:
          if(value === 0) this.newJob = 'Musicien VR'
          else this.newJob = 'Ingénieur dans les collants indestructibles'
        break;
      }

      /*QI très haut/bas (+ de 150 et - de 30) : sans-abris
intelligent (100 et 160) : Médecin de robot
Bête (entre 30 et 80) : Influenceur dans la pantoufle*/
      console.log('joblength : ', this.jobs.length)
      if (!this.jobs.includes(undefined) && this.jobs.length === 4) {
        this.newJob = this.jobs.join('')
        console.log(this.jobs.join(''))
        console.log(this.newJob)
      }
    },
    updateIQ(value) {
      if(value > 160 || value < 30) {
        this.newJob = 'Sans-abris'
      } else if(value > 100 && value < 160) {
        this.newJob = 'Médecin de robot'
      } else if(value > 30 && value < 80) {
        this.newJob = 'Influenceur dans la pantoufle'
      }
    },
    prevent(e) {
      e.preventDefault()
      this.$helpers.updateInput(e.type, e.type, e.type)
    },
  },
}
</script>
