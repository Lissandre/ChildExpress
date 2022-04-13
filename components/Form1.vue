<template>
  <div class="flex flex-col absolute bottom-1/2 left-20">
    <form @submit.prevent="prevent">
      <component
        v-for="input in inputs"
        :key="input.name"
        :is="input.component"
        :input="input"
        v-on:updateInput="(a, b, c) => $helpers.updateInput(a, b, c)"
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
      this.$helpers.updateInput(e.type, e.type, e.type)
    },
  },
}
</script>
