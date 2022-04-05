<template>
  <div>
    <button @click='changeFocus' class="absolute bottom-0 pb-4 text-gray-500 left-50"> Changer focus</button>
    <input @change='changeRange' class="absolute bottom-px pb-4 text-gray-500 left-1/2" type="range" id="scale" name="scale" min="0" max="10" v-model="range">
  </div>
</template>

<script>
export default {
  name: 'Range',
  data() {
    return {
      range: this.$store.getters['scene/getRange']
    }
  },
  methods: {
    changeRange(e) {
      console.log(this.$store.getters['scene/getRange'])
      if(this.$store.getters['scene/getRange']) {
        this.$store.commit('scene/changeRange', e.target.value)
      }
    },
    changeFocus() {
      if(this.$store.getters['scene/isFace'] === true) {
        this.$store.commit('scene/toggleIsFace', false)
      } else {
         this.$store.commit('scene/toggleIsFace', true)
      }
    }
  },
}
</script>
