<template>
  <div>
    <LocaleSwitcher />
    <Tutorial />
    <button @click='changeFocus()' class="absolute bottom-0 pb-4 text-gray-500 left-50"> Changer focus</button>
  </div>
</template>

<script>
export default {
  name: 'Home',

  methods: {
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
