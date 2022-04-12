<template>
  <div class="flex flex-col absolute bottom-1/2 left-20">
    <h1 class="text-3xl">{{ $t('form3.title') }}</h1>

    <component
    v-for="input in inputs"
    :key="input.name"
    :is="input.component"
    :input="input"
    v-on:updateInput="(a, b ,c ) => $helpers.updateInput(a, b, c)"
    :locale="$t(`form3.${slugify(`${input.type}_${input.name}`, { replacement: '_', lower: true})}`)"
    ></component>
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
  },
}
</script>
