<template>
  <div class="pointer-events-auto">
  <fieldset class="animate-bounce-in">
    <p>{{ locale }}</p>
    <input
      :type="input.type"
      :id="input.name"
      :name="input.name"
      :min="input.from"
      :max="input.to"
      :step="input.step"
      @input="(e) => update(e)"
      :value="input.value"
      required="required"
    />
  </fieldset>
  </div>
</template>

<script>
export default {
  name: 'InputRange',
  props: ['input', 'locale'],

  data() {
    return {}
  },
  mounted() {
  },
  methods: {
    update(e) {
      this.$emit('updateInput', this.input.type, this.input.name, e.target.value)
    },
  },
}
</script>
