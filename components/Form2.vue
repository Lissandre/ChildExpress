<template>
  <div class="flex flex-col relative h-full w-full ">

    <form @submit.prevent="prevent">
      <component
        v-for="input in inputs"
        :key="input.name"
        :is="input.component"
        :input="input"
        v-on:updateInput="(a, b, c) => $helpers.updateInput(a, b, c)"
        :locale="
          $t(
            `form2.${slugify(`${input.type}_${input.name}`, {
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
      this.$helpers.updateInput(e.type, e.type, e.type)
    },
  },
}
</script>
