<template>
  <div class="pointer-events-auto">
    <fieldset :class="`animate-bounce-in ${input.class} checkbox-fieldset`">
      <label class="text-white">{{ locale.label1 }}</label>
      <div class="mr-5">
        <input
          :type="input.type"
          :id="input.name"
          :name="input.name"
          :min="input.from"
          :max="input.to"
          :step="input.step"
          @input="(e) => update(e)"
          :value="input.value"
        />
        <span></span>
      </div>
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
fieldset {
  display: flex;
  margin-right: 20px;
  position: relative;
  width: fit-content;
}
fieldset input[type='checkbox'] {
  appearance: none;
  background-color: transparent;
  font: inherit;
  box-shadow: inset 3px 3px 4px rgba(15, 84, 228, 0.75),
    inset -1px -1px 10px white;
  border-radius: 20px;
  position: relative;
  height: 30px;
  width: 60px;
  position: absolute;
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  -ms-transition: all 0.4s ease;
  transition: all 0.4s ease;
  cursor: pointer;
}

fieldset label {
  margin-right: 20px;
}

fieldset span {
  display: block;
  height: 20px;
  width: 20px;
  margin-right: 20px;

  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;

  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  -ms-transition: all 0.4s ease;
  transition: all 0.4s ease;

  cursor: pointer;
  top: 5px;
  left: 5px;

  appearance: none;
  background-color: transparent;
  box-shadow: inset 0px 2px 6px white, 3px 3px 4px rgb(15 84 228 / 75%);
  border-radius: 20px;
  position: relative;
}

fieldset input[type='checkbox']:checked {
  background-color: #0f54e4;
}

fieldset input[type='checkbox']:checked + span {
  left: 35px;
  background-color: #0f54e4;
}
</style>
