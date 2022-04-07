<template>
  <div class="flex flex-col absolute bottom-1/2 left-20">
    <h1 class="text-3xl">Form 1</h1>
    <div class="bottom-1/2 pb-4 text-gray-500 left-1/2 pointer-events-auto">
      <p>{{ store.constants.SCALE }}</p>
      <input
        type="range"
        id="scale"
        name="scale"
        min="0"
        max="2"
        step="0.1"
        @input="(e) => changeRange(store.constants.SCALE, e)"
        value="scale"
      />
    </div>

    <div class="bottom-1/2 pb-4 text-gray-500 left-1/4 pointer-events-auto">
      <p>{{ store.constants.POSITION }}</p>
      <input
        type="range"
        id="scale"
        name="scale"
        min="0"
        max="10"
        @input="(e) => changeRange(store.constants.POSITION, e)"
        value="position"
      />
    </div>
    <button
      @click="changeFocus"
      class="bottom-0 left-0 pb-4 text-gray-500 pointer-events-auto"
    >
      Changer focus
    </button>

    <div class="bottom-1/2 pb-4 text-gray-500 left-1/4 pointer-events-auto">
      <button @click="changeActiveForm">Valider</button>
    </div>
  </div>
</template>

<script>
import { useStore } from '../pinia/main'

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
    this.position = this.store.getRange(this.store.constants.POSITION)
    this.scale = this.store.getRange(this.store.constants.SCALE)
  },
  /*
  computed: {
    getRange () {
      return id => {
        return this.$store.getters[`${this.name}/get${id}`, id]
      }
    }
  },*/

  /*
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
  */
  methods: {
    //changeRange: id => e => {
    changeRange(id, e) {
      // console.log(this.$store.getters['form1/getRange', 'scale'])
      console.log(id, e.target.value)
      this.store.changeRange(id, e.target.value, this.$scene)

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
    changeActiveForm() {
      console.log('etest')
      this.store.changeActiveForm(2)
    },
  },
}
</script>
