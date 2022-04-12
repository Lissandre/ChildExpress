<template>
  <div class="bottom-1/2 pb-4 text-gray-500 left-1/4 pointer-events-auto">
    <fieldset
      :id="input.name"
      class="flex justify-around items-center"
      @click="(e) => emitJob(e, fieldsetIndex)"
      :key="fieldsetIndex"
    >
      <p class="w-20">{{ locale.label1 }}</p>
      <input
        :type="input.type"
        :id="input.name"
        :length="input.length"
        :name="input.name"
        @input="(e) => update(e)"
        :value="(index - 1) / (input.length - 1)"
        v-for="index in 6"
        :key="index"
        class="w-10 z-[1]"
      />
      <p class="w-20">{{ locale.label2 }}</p>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'InputRadio',
  props: ['input', 'locale', 'fieldsetIndex'],

  data() {
    return {}
  },
  mounted() {
    this.value
  },
  methods: {
    update(e) {
      this.$emit(
        'updateInput',
        this.input.type,
        this.input.name,
        e.target.value
      )
    },
    emitJob(e, fieldsetIndex) {
      const value = Math.round(e.target.value)
      this.$emit(
        'updateJob',
        value,
        fieldsetIndex
      )
    },
  },
}
</script>
