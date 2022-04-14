<template>
  <div :class="`pb-4 text-gray-500 left-1/4 pointer-events-auto absolute ${input.class}`">
    <fieldset
      :id="input.name"
      class="flex justify-around items-center "
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
        v-for="index in input.length"
        :key="index"
        required="required"
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
    console.log('')
  },
  methods: {
    update(e) {
      console.log(this.input.name)
      this.$emit(
        'updateInput',
        this.input.type,
        this.input.name,
        e.target.value
      )
    },
    emitJob(e, fieldsetIndex) {
      if (e.target.value === undefined) return
      const value = Math.round(e.target.value)
      this.$emit('updateJob', value, fieldsetIndex)
    },
  },
}
</script>
