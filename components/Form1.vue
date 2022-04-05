<template>
  <div>
    <button
      @click="changeFocus"
      class="absolute bottom-0 pb-4 text-gray-500 left-50 pointer-events-auto"
    >
      Changer focus
    </button>
    <p>{{ scale }}</p>
    <input
      class="absolute bottom-px pb-4 text-gray-500 left-1/2 pointer-events-auto"
      type="range"
      id="scale"
      name="scale"
      min="0"
      max="10"
      v-model="scale"
    />
  </div>
</template>

<script>
import { useStore } from '../store/main'
export default {
  name: 'Form1',
  data() {
    return {
      name: 'form1',
      // scales: 2,
    }
  },
  setup() {
    const store = useStore()
    // `name` and `doubleCount` are reactive refs
    // This will also create refs for properties added by plugins
    // but skip any action or non reactive (non ref/reactive) property

    return { store }
  },
  /*
  computed: {
    getRange () {
      return id => {
        return this.$store.getters[`${this.name}/get${id}`, id]
      }
    }
  },*/

  computed: {
    scale: {
      get() {
        console.log(this.store)
        const yes = this.store.getRange('scale')
        return yes
      },
      set(e) {
        console.log(e)
        this.changeRange('scale', e)
      },
    },
  },
  methods: {
    //changeRange: id => e => {
    changeRange(id, e) {
      // console.log(this.$store.getters['form1/getRange', 'scale'])
      console.log(this.$scene)
      this.store.changeRange(id, e, this.$scene)

      /*if(this.$store.getters[`${this.name}/get${id}`, id]) {
        this.$store.commit(`${this.name}/change${id}`, id, e.target.value)
      }*/
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
