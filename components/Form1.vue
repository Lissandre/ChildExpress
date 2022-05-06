<template>
  <div class="flex flex-col relative h-full w-full" style="overflow: hidden">
    <form
      @submit.prevent="prevent"
      id="form1"
      class="absolute h-full w-full flex flex-col justify-center"
    >
      <h1 class="absolute left-1/3 top-1/4 text-white z-[1] text-3xl">
        Quelques infos sur vous
      </h1>
      <component
        v-for="input in inputs"
        :key="input.name"
        :is="input.component"
        :input="input"
        v-on:updateInput="(a, b, c) => $helpers.updateInput(a, b, c)"
        ref="inputes"
        :locale="
          $t(
            `form1.${slugify(`${input.type}_${input.name}`, {
              replacement: '_',
              lower: true,
            })}`
          )
        "
      ></component>
    </form>
  </div>
</template>

<script>
import { useStore } from '@/stores/'
import { form1 } from '@/data/forms.json'
import slugify from 'slugify'

export default {
  name: 'Form1',
  data() {
    return {
      name: 'form1',
      inputs: [],
      slugify: slugify,
    }
  },
  setup() {
    const store = useStore()
    return { store }
  },
  mounted() {
    this.inputs = form1.inputs
  },
  methods: {
    prevent(e) {
      e.preventDefault()
      this.$refs.inputes.forEach((input) => {
        const fieldset = input.$el.getElementsByTagName('fieldset')[0]
        if (fieldset) {
          console.log(fieldset.classList)
        fieldset.classList.remove('animate-bounce-in')
        fieldset.classList.add('animate-bounce-out')
        }
      })
      setTimeout(() => {
        this.$helpers.updateInput(e.type, e.type, e.type)
      }, 2000)
    },

    /*changeZindex(e) {
      const form1 = document.getElementById('form1')
      if (form1.classList.contains('behind')) {
        form1.classList.remove('behind')
      } else {
        form1.classList.add('behind')
      }
    },*/
  },
}
</script>