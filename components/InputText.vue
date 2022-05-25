<template>
  <div class="bottom-1/2 pb-4 text-gray-500 left-1/3 pointer-events-auto">
    <fieldset :class="`${input.class} animate-bounce-in`">
      <label class="text-white">{{ locale.label1 }}</label>
      <div class="mr-5 text-wrapper">
        <input
          :type="input.type"
          :id="input.name"
          :name="input.name"
          :min="input.from"
          :max="input.to"
          :step="input.step"
          @input="(e) => update(e)"
          :value="input.value"
          class="text-white"
        />
        <div class="underline"></div>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'InputText',
  props: ['input', 'locale'],

  data() {
    return {}
  },
  mounted() {},
  methods: {
    update(e) {
      this.$emit(
        'updateInput',
        this.input.type,
        this.input.name,
        e.target.value
      )
    },
  },
}
</script>


<style scoped>

.text-wrapper {
  position: relative;
}

.baby-name label {
  font-size: 14px;
}

.baby-name input[type='text'] {
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  display: inline-block;
  overflow: hidden;
  background: none;
  outline: none !important;

}
.underline {
  transition: all 0.5s;
  display: inline-block;
  bottom: 0;
  left: 0%;
  position: absolute;
  width: 0%;
  height: 2px;
  background-color: white;
}

.baby-name input[type='text']:focus + .underline {
  width: 100%;
}

.baby-name input[type='text']:focus{
  appearance: none;
}
</style>