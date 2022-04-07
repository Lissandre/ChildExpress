<template>
  <div class="absolute top-2 max-w-screen-md left-1/2 h-20"  style="transform: translate3d(-50%, 0%, 0)">
    <ul class="flex flex-row absolute top-2 flex flex-row justify-around items-center w-60 left-1/2" style="transform: translate3d(-50%, 0, 0)">
      <li class="border border-black rounded-full w-10 h-10 flex justify-center items-center" :class="{ active : store.getActiveForm === 1}">1</li>
      <li class="border border-black rounded-full w-10 h-10 flex justify-center items-center" :class="{ active : store.getActiveForm === 2}">2</li>
    </ul>
</div>
</template>

<script>
import { useStore } from '@/stores/'

export default {
  name: 'ProgressBar',
  data() {
    return {
    }
  },
  setup() {
    const store = useStore()
    return { store }
  },
  mounted() {
  },
  methods: {
    changeRange(id, e) {
      console.log(id, e.target.value)
      this.store.changeRange(id, e.target.value)
    },
  },
}
</script>

<style scoped>
.active {
  font-size: 22px;
  width: 56px;
  height: 56px;
}
</style>