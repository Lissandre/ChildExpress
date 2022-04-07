<template>
  <div class="flex flex-col absolute bottom-1/2 left-20">
    <h1 class="text-3xl">{{ $t('form2.name') }}</h1>

    <div class="bottom-1/2 pb-4 text-gray-500 left-1/4 pointer-events-auto">
      <p>{{ $t('form2.rangeHandsSize') }}</p>
      <input
        type="range"
        id="scale"
        name="scale"
        min="0"
        max="1"
        step="0.01"
        @input="(e) => changeRange(store.constants.HANDSSIZE, e)"
        value="handsSize"
      />
    </div>
    <div class="bottom-1/2 pb-4 text-gray-500 left-1/4 pointer-events-auto">
      <p>{{ $t('form2.rangeOverallSize') }}</p>
      <input
        type="range"
        id="scale"
        name="scale"
        min="0"
        max="1"
        step="0.01"
        @input="(e) => changeRange(store.constants.OVERALLSIZE, e)"
        value="overallSize"
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
    this.handsSize = this.store.getRange(this.store.constants.HANDSSIZE)
    this.overallSize = this.store.getRange(this.store.constants.OVERALLSIZE)
  },
  methods: {
    changeRange(id, e) {
      this.store.changeRange(id, e.target.value)
    },
  },
}
</script>
