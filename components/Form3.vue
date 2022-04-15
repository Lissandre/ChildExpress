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

    <p v-if="newJob && (newJob.length > 3)">{{ $t(`job.${this.newJob}`) }}</p>
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
      jobs: new Array(4),
      newJob: undefined,
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
      console.log(value, fieldsetToUpdate)
      // console.log(this.inputs[name], this.inputs[name].value)
      this.jobs[fieldsetToUpdate] = value

      console.log(this.jobs.length)
      if (!this.jobs.includes(undefined)) {
        this.newJob = this.jobs.join('')
        console.log(this.newJob)
      }
    },
    prevent(e) {
      e.preventDefault()
      this.$helpers.updateInput(e.type, e.type, e.type)
    },
  },
}
</script>
