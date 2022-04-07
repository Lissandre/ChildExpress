<template>
  <div class="flex flex-col absolute bottom-1/2 left-20">
    <h1 class="text-3xl mb-3">{{ $t('form2.name') }}</h1>
    <div class="bottom-px pb-4 text-gray-500 left-1/2 pointer-events-auto">
      <p>{{ $t('form2.rangeRotation') }}</p>
      <input
      type="range"
      id="rotation"
      name="rotation"
      min="0"
      max="2"
      step="0.1"
      @input="(e) => changeRange(store.constants.ROTATION, e)"
      value="rotation"
    />
    </div>
</div>
</template>

<script>
import { useStore } from '@/stores/'

export default {
  name: 'Form2',
  data() {
    return {
      name: 'form2',
      rotation: ''
    }
  },
  setup() {
    const store = useStore()
    return { store }
  },
  mounted() {
    this.rotation = this.store.getRange(this.store.constants.ROTATION)
  },
  methods: {
    changeRange(id, e) {
      console.log(id, e.target.value)
      this.store.changeRange(id, e.target.value)
    },
  },
}
</script>
