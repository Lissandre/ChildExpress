<template>
  <div
    class="pb-4 text-gray-500 pointer-events-auto flex left-1/3 mt-[100px]"
    style="justify-content: right"
  >
    <fieldset
      :id="input.name"
      :class="`flex justify-around items-center animate-bounce-in ${input.class}`"
      @click="(e) => emitJob(e, fieldsetIndex)"
      :key="fieldsetIndex"
    >
      <label class="w-20 mr-3 w-max text-white">{{ locale.label1 }}</label>
      <input
        v-if="!input.class.includes('rating')"
        :type="input.type"
        :id="input.name"
        :length="input.length"
        :name="input.name"
        @input="(e) => update(e)"
        :value="(index - 1) / (input.length - 1)"
        v-for="index in input.length"
        :key="index"
        required="required"
        class="w-10 z-[1] cursor-pointer"
      />
      <span class="checkmark"></span>
      <p class="w-20 w-max text-white">{{ locale.label2 }}</p>

      <div class="star-rating star-5" v-if="input.class.includes('rating')">
        <input
          type="radio"
          name="rating"
          value="1"
          @input="() => update((e = { target: { value: 1 } }))"
        /><i></i>
        <input
          type="radio"
          name="rating"
          value="2"
          @input="() => update((e = { target: { value: 2 } }))"
        /><i></i>
        <input
          type="radio"
          name="rating"
          value="3"
          @input="() => update((e = { target: { value: 3 } }))"
        /><i></i>
        <input
          type="radio"
          name="rating"
          value="4"
          @input="() => update((e = { target: { value: 4 } }))"
        /><i></i>
        <input
          type="radio"
          name="rating"
          value="5"
          @input="() => update((e = { target: { value: 5 } }))"
        /><i></i>
      </div>
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
  mounted() {},
  methods: {
    update(e) {
      console.log(this.input)
      this.$emit(
        'updateInput',
        this.input.type,
        this.input.name,
        e.target.value,
        this.input.length
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

<style scoped>
p {
  width: max-content;
}
fieldset {
  opacity: 0;
}

fieldset input[type='radio'] {
  appearance: none;
  background-color: transparent;
  font: inherit;
  box-shadow: inset 3px 3px 4px rgba(15, 84, 228, 0.75),
    inset -1px -1px 10px white;
  border-radius: 50%;
  position: relative;
  width: 30px;
  height: 30px;
  margin-right: 20px;
}
fieldset input[type='radio']::before {
  content: '';
  border-radius: 50%;
  transition: 120ms transform ease-in-out;
  background-color: #0f54e4;
  position: absolute;
  transform: translate3d(-50%, -50%, 0) scale(0);
  left: 50%;
  top: 50%;
  width: 15px;
  height: 15px;
  box-shadow: 1px 5px 5px rgb(15 84 228 / 56%);
}
fieldset input[type='radio']:checked::before {
  transform: translate3d(-50%, -50%, 0) scale(1);
}

.star-rating {
  font-size: 0;
  white-space: nowrap;
  display: inline-block;
  /* width: 250px; remove this */
  overflow: hidden;
  position: relative;
  background: url('@/assets/images/StarEmpty.svg');
  background-size: contain;
  height: 47.5px;
}
.star-rating i {
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  /* width: 20%; remove this */
  z-index: 1;
  background: url('@/assets/images/StarFilled.svg');
  background-size: contain;
  transition: 120ms all ease-in-out;
}
.star-rating input {
  -moz-appearance: none;
  -webkit-appearance: none;
  opacity: 0;
  display: inline-block;
  /* width: 20%; remove this */
  height: 100% !important;
  padding: 0;
  z-index: 2;
  position: relative;
  cursor: pointer;
  margin: 0 !important;
  transition: 120ms all ease-in-out;
}
.star-rating input:hover + i,
.star-rating input:checked + i {
  opacity: 1;
}
.star-rating i ~ i {
  width: 40%;
}
.star-rating i ~ i ~ i {
  width: 60%;
}
.star-rating i ~ i ~ i ~ i {
  width: 80%;
}
.star-rating i ~ i ~ i ~ i ~ i {
  width: 100%;
}
::after,
::before {
  height: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  text-align: center;
  vertical-align: middle;
}

.star-rating.star-5 {
  width: 250px;
}
.star-rating.star-5 input,
.star-rating.star-5 i {
  width: 20%;
}
.star-rating.star-5 i ~ i {
  width: 40%;
}
.star-rating.star-5 i ~ i ~ i {
  width: 60%;
}
.star-rating.star-5 i ~ i ~ i ~ i {
  width: 80%;
}
.star-rating.star-5 i ~ i ~ i ~ i ~ i {
  width: 100%;
}

.star-rating.star-3 {
  width: 150px;
}
.star-rating.star-3 input,
.star-rating.star-3 i {
  width: 33.33%;
}
.star-rating.star-3 i ~ i {
  width: 66.66%;
}
.star-rating.star-3 i ~ i ~ i {
  width: 100%;
}

.eyes-color input {
  border-radius: 10px !important;
  box-shadow: none !important;
}
.eyes-color input:nth-of-type(1) {
  background: #b1cf99;
}
.eyes-color input:nth-of-type(2) {
  background: #4b6eb8;
}
.eyes-color input:nth-of-type(3) {
  background: #85633b;
}
.eyes-color input:nth-of-type(4) {
  background: #321c07;
}

.eyes-color input::before {
  display: none !important;
}
.eyes-color input:checked {
  outline: 4px solid rgba(15, 84, 228, 1);
}

.gender {
  display: flex;
  flex-wrap: wrap;
    width: max-content;
}

.gender label {
  flex-basis: 100%;
  margin-bottom: 10px;
}

.gender input {
  margin-right: 120px !important;
}
.gender input::after {
  font-size: 20px;
  position: absolute;
  left: 20px;
  display: flex;
  align-items: center;
  color: white;
  margin-left: 30px;
  width: max-content;
}
.gender input:nth-child(2)::after {
  content: 'Homme';
}
.gender input:nth-child(3)::after {
  content: 'Femme';
}
.gender input:nth-child(4)::after {
  content: 'Non-binaire';
}
</style>