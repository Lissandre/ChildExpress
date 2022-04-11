<template>
  <div class="flex flex-col absolute bottom-1/2 left-20">
    <h1 class="text-3xl">{{ $t('form1.title') }}</h1>

    <component
      v-for="input in inputs"
      :key="input.name"
      :is="input.component"
      :input="input"
      v-on:updateInput="(a, b ,c ) => $helpers.updateInput(a, b, c)"
      :locale="$t(`form1.${slugify(`${input.type}_${input.name}`, { replacement: '_', lower: true})}`)"

    ></component>

    <div class="bottom-1/2 pb-4 text-gray-500 left-1/4 pointer-events-auto">
      <button @click="changeActiveForm">{{ $t('form1.button_submit') }}</button>
    </div>
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
    this.inputs = form1
  },
  methods: {
    changeActiveForm() {
      this.store.changeActiveForm(2)
      // this.store.toggleIsFace(false)
    },
  },
}
</script>
