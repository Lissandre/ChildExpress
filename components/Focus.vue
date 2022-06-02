<template>
  <div class="relative bottom-2 p-4 z-50 pointer-events-auto">
    <button
      @click="changeFocus"
      class="right-10 top-10 pb-4 text-gray-500 pointer-events-auto absolute button-face"
      v-if="currentFocus"
    ></button>
    <button
      @click="changeFocus"
      class="right-20 top-10 pb-4 text-gray-500 pointer-events-auto absolute button-pipette"
      v-if="!currentFocus"
    ></button>
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
      if(!this.currentFocus) this.soundEvents()
      this.currentFocus = !this.currentFocus
        this.store.toggleIsFace(this.currentFocus)

    },

    soundEvents() {
      $nuxt.$emit('updateSound', 'form2', 'face', '', '')
    },
  },
}
</script>


<style scoped>
button {
  height: 60px;
  width: 60px;
  box-shadow: 1px 5px 5px rgb(15 84 228 / 56%);
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all ease-out 0.2s;
  transform: scale3d(0.8, 0.8, 0.8);
  perspective-origin: 500% 200%;
}
button:hover {
  transform: scale3d(1, 1, 1)
}
.button-face {
  background: no-repeat center center url('@/assets/images/face.svg');
}
.button-pipette {
  background: no-repeat center center url('@/assets/images/pipette.svg');
}

.button-face, .button-pipette {
  background-color: #0F54E4;
  background-size: 40px 40px;
}
</style>