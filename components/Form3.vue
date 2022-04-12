<template>
  <div class="flex flex-col absolute bottom-1/2 left-20">
    <h1 class="text-3xl">{{ $t('form2.name') }}</h1>


    <fieldset id="group1">
        <component
        v-for="input in inputs"
        :key="input.name"
        :is="input.component"
        :input="input"
        v-on:update="update"
        :locale="$t(`form1.${slugify(`${input.type}_${input.name}`, { replacement: '_', lower: true})}`)"
        ></component>
    <fieldset>

  </div>
</template>

<script>
import { useStore } from '@/stores/'

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
  mounted() {},
  methods: {
    changeRange(id, e) {
      this.store.changeRange(id, e.target.value)
    },
  },
}
</script>
