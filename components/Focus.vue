<template>
  <div class="absolute bottom-2 p-4 z-50 pointer-events-auto">
    <button
      @click="changeFocus"
      class="left-0 pb-4 text-gray-500 pointer-events-auto"
    >
      Changer focus
    </button>
  </div>
</template>

<script>
import { useStore } from '@/stores'

export default {
  name: 'Focus',
  setup() {
    const store = useStore()
    return { store }
  },
  methods: {
    changeFocus() {
      if (this.store.face) {
        this.store.toggleIsFace(false)
      } else {
        this.store.toggleIsFace(true)
      }
    },
  },
}
</script>
