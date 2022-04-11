<template>
  <div class="flex flex-col absolute bottom-1/2 left-20">
    <h1 class="text-3xl">{{ $t('form1.name') }}</h1>
    <div class="bottom-1/2 pb-4 text-gray-500 left-1/4 pointer-events-auto">
      <p>{{ $t('form1.rangeNoseSize') }}</p>
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
      <p>{{ $t('form1.rangeEarsSize') }}</p>
      <input
        type="range"
        id="scale"
        name="scale"
        min="0"
        max="1"
        step="0.01"
        @input="(e) => changeRange(store.constants.EARSSIZE, e)"
        value="earsSize"
      />
    </div>
    <div class="bottom-1/2 pb-4 text-gray-500 left-1/4 pointer-events-auto">
      <button @click="changeActiveForm">{{ $t('form1.submitButton') }}</button>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/stores/'

export default {
  name: 'Form1',
  data() {
    return {
      name: 'form1',
      position: '',
      scale: '',
    }
  },
  setup() {
    const store = useStore()
    // `name` and `doubleCount` are reactive refs
    // This will also create refs for properties added by plugins
    // but skip any action or non reactive (non ref/reactive) property
    return { store }
  },
  mounted() {
    this.noseSize = this.store.getRange(this.store.constants.NOSESIZE)
    this.earsSize = this.store.getRange(this.store.constants.EARSSIZE)
  },
  methods: {
    changeRange(id, e) {
      this.store.changeRange(id, e.target.value)
    },
    changeActiveForm() {
      this.store.changeActiveForm(2)
      // this.store.toggleIsFace(false)
    },
  },
}
</script>
