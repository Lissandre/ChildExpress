<template>
  <div
    class="absolute top-2 max-w-screen-md left-1/2 h-20 z-[1] progress-bar"
    style="transform: translate3d(-50%, 0%, 0)"
  >
    <ul
      class="
        flex flex-row
        absolute
        top-2
        flex flex-row
        justify-around
        items-center
        left-1/2
        list
      "
      style="transform: translate3d(-50%, 0, 0)"
    >
      <li
        class="
          w-10
          h-10
          relative
          flex flex-col
          justify-center
          items-center
          item
        "
        :class="{ active: store.getActiveForm === index }"
        v-for="index in getTotalForms"
        :key="index"
      >
        <div
          class="
            flex
            justify-center
            items-center
            w-10
            h-10
            border border-white
            rounded
            text-white
            item-wrapper
          "
        >
          <h2>{{ index }}</h2>
        </div>
        <h3
          class="
            absolute
            top-16
            w-fit
            text-center text-white
            invisible
            font-thin
          "
        >
          {{ $t(`step.${index}`) }}
        </h3>
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from '@/stores/'

export default {
  name: 'ProgressBar',
  data() {
    return {}
  },
  setup() {
    const store = useStore()
    return { store }
  },
  mounted() {},

  computed: {
    getTotalForms: function () {
      return this.store.getTotalForms
    },
  },
  methods: {
    changeRange(id, e) {
      this.store.changeRange(id, e.target.value)
    },
  },
}
</script>

<style scoped>
.progress-bar {
  font-family: 'roc-grotesk-wide';
  text-transform: uppercase;
  font-size: 14px;
}

.list {
  width: 40rem;
}

.list::after {
  content: '';
  height: 1px;
  background: white;
  z-index: -1;
  width: 80%;
  position: absolute;
}
.item-wrapper {
  backdrop-filter: blur(10px);
  will-change: width, height;
  transition: all ease 0.4s;
  font-family: 'NeueWorld';
  font-size: 22px;
}
h2 {
  font-size: 22px;
}
.active {
  font-size: 16px;
  width: 56px;
  height: 56px;
  transition: width height ease 0.4s;
}
.active div {
  width: 100%;
  height: 100%;
}

.active h2 {
  font-size: 30px;
}

.active h3 {
  visibility: visible;
}
</style>
