<template>
  <div class="bottom-1/2 pb-4 text-gray-500 left-1/4 pointer-events-auto">
    <p>{{ locale }}</p>

    <fieldset :id="input.name">
    <input
      :type="input.type"
      :id="input.name"
      :length="input.length"
      @input="(e) => update(e)"
      :value="input.value"
      v-for="index in 6"
      :key="index"
    />
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'InputRadio',
  props: ['input', 'locale'],

  data() {
    return {}
  },
  mounted() {
      this.value
  },
  methods: {
    update(e) {
      this.$emit('updateInput', this.input.type, this.input.name, e.target.value)
    },
  },
}
</script>
