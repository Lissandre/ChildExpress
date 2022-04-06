<template>
  <div class="flex flex-col absolute bottom-1/2 left-20">
    <h1 class="text-3xl">Form 2</h1>
    <button
      @click="changeFocus"
      class="bottom-0 pb-4 text-gray-500 left-50 pointer-events-auto"
    >
      Changer focus
    </button>
    <div class="bottom-px pb-4 text-gray-500 left-1/2 pointer-events-auto">
      <p>{{ store.constants.ROTATION}} </p>
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
import { useStore } from '../store/main'

export default {
  name: 'Form1',
  data() {
    return {
      name: 'form1',
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
      this.store.changeRange(id, e.target.value, this.$scene)
    },
    changeFocus() {
      if (this.$store.getters['scene/isFace'] === true) {
        this.$store.commit('scene/toggleIsFace', false)
      } else {
        this.$store.commit('scene/toggleIsFace', true)
      }
    },
  },
}
</script>
