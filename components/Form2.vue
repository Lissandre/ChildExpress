<template>
  <div class="flex flex-col relative h-full w-full">
    <Focus />

    <form @submit.prevent="prevent">
      <div class="face">
        <component
          v-for="input in inputs"
          v-if="input.class.includes(store.isFace ? 'face' : 'body')"
          :key="input.name"
          :is="input.component"
          :input="input"
          ref="inputs"
          v-on:updateInput="
          (type, name, value, optional) => this.inputChange(type, name, value, optional)"
          :locale="
            $t(
              `form2.${slugify(`${input.type}_${input.name}`, {
                replacement: '_',
                lower: true,
              })}`
            )
          "
        ></component>
      </div>
    </form>

    <Persona />
  </div>
</template>

<script>
import { useStore } from '@/stores/'
import { form2 } from '@/data/forms.json'
import slugify from 'slugify'

export default {
  name: 'Form2',
  data() {
    return {
      name: 'form2',
      inputs: [],
      slugify: slugify,
    }
  },
  setup() {
    const store = useStore()
    return { store }
  },
  mounted() {
    this.inputs = form2.inputs
  },
  methods: {
    changeRange(id, e) {
      this.store.changeRange(id, e.target.value)
    },
    prevent(e) {
      e.preventDefault()
      this.$refs.inputs.forEach((input) => {
        const fieldset = input.$el.getElementsByTagName('fieldset')[0]
        if (fieldset) {
          fieldset.classList.remove('animate-bounce-in')
          fieldset.classList.add('animate-bounce-out')
        }
      })
      setTimeout(() => {
        this.$helpers.updateInput(e.type, e.type, e.type)
      }, 1000)
    },
    inputChange(type, name, value, optional) {
      $helpers.updateInput(type, name, value); 

      console.log(type)
      if(type === 'radio') {
        // If radio couleurs cheveux/yeux, check et compare le store
      }
      $nuxt.$emit('updateSound', 'form2', type, name, value)
    }
  },
}
</script>


<style scoped>
</style>