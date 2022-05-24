<template>
  <div class="relative bottom-2 p-4 z-50 pointer-events-auto">
    <button
      @click="changeFocus"
      class="right-10 top-10 pb-4 text-gray-500 pointer-events-auto absolute"
      v-if="currentFocus"
    >
    face
    </button>
    <button
      @click="changeFocus"
      class="right-20 top-10 pb-4 text-gray-500 pointer-events-auto absolute"
      v-if="!currentFocus"
    >
    pipette
    </button>
  </div>
</template>

<script>
import { useStore } from '@/stores'

export default {
  name: 'Focus',
  data() {
    return {
      currentFocus: ''
    }
  },
  setup() {
    const store = useStore()
    return { store }
  },
  mounted() {
    this.currentFocus = this.store.isFace
  },
  methods: {
    changeFocus() {
      console.log('changeFocus')
      this.currentFocus = !this.currentFocus
        this.store.toggleIsFace(this.currentFocus)
    },
  },
}
</script>


<style scoped>
button {
  background: blue;
  height: 60px;
  width: 60px;
  box-shadow: 1px 5px 5px rgb(15 84 228 / 56%);
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style> 