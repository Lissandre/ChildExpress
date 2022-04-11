<template>
  <div class="flex flex-col absolute bottom-1/2 left-20">
    <h1 class="text-3xl">{{ $t('form1.title') }}</h1>
    <!--<div class="bottom-1/2 pb-4 text-gray-500 left-1/4 pointer-events-auto">
      <p>{{ $t('form1.range_nose_size') }}</p>
      <input
        type="range"
        id="scale"
        name="scale"
        min="0"
        max="1"
        step="0.01"
        @input="(e) => changeRange(store.constants.NOSESIZE, e)"
        value="noseSize"
      />
    </div>
    <div class="bottom-1/2 pb-4 text-gray-500 left-1/4 pointer-events-auto">
      <p>{{ $t('form1.range_ears_size') }}</p>
      <input
        type="range"
        id="position"
        name="position"
        min="0"
        max="1"
        step="0.01"
        @input="(e) => changeRange(store.constants.EARSSIZE, e)"
        value="earsSize"
      />
    </div> -->
    <div class="bottom-1/2 pb-4 text-gray-500 left-1/4 pointer-events-auto">
      <button @click="changeActiveForm">{{ $t('form1.button_submit') }}</button>
    </div>

    <component
      v-for="input in inputs"
      :key="input.name"
      :is="input.component"
      :input="input"
      v-on:update="update"
      :locale="$t(`form1.${slugify(`${input.type}_${input.name}`, { replacement: '_', lower: true})}`)"

    ></component>
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
      position: '',
      scale: '',
      inputs: [],
      slugify: slugify
    }
  },
  computed: {},
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
    update(type, name, value) {
      switch (type) {
        case 'range':
          console.log(name)
          this.store.changeRange(this.store.constants[name.toUpperCase()], value)
          break;
        default :
          break;
      }
    },
  },
}
</script>
