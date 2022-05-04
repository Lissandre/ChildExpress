<template>
  <div
    class="
      pb-4
      text-gray-500
      pointer-events-auto
      relative
      left-1/3
      mt-[100px]
      test
    "
  >
    <fieldset
      :id="input.name"
      :class="`flex justify-around items-center animate-bounce-in ${input.class}`"
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
        class="w-10 z-[1] cursor-pointer"
      />
      <span class="checkmark"></span>
      <p class="w-20">{{ locale.label2 }}</p>

        <div class="star-rating__stars" v-if="input.class.includes('rating')">
        <input class="star-rating__input" type="radio" name="rating" value="1" id="rating-1" />
        <label class="star-rating__label" for="rating-1" aria-label="One"></label>
        <input class="star-rating__input" type="radio" name="rating" value="2" id="rating-2" />
        <label class="star-rating__label" for="rating-2" aria-label="Two"></label>
        <input class="star-rating__input" type="radio" name="rating" value="3" id="rating-3" />
        <label class="star-rating__label" for="rating-3" aria-label="Three"></label>
        <input class="star-rating__input" type="radio" name="rating" value="4" id="rating-4" />
        <label class="star-rating__label" for="rating-4" aria-label="Four"></label>
        <input class="star-rating__input" type="radio" name="rating" value="5" id="rating-5" />
        <label class="star-rating__label" for="rating-5" aria-label="Five"></label>
        <div class="star-rating__focus"></div>
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
  mounted() {
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
  box-shadow: inset 3px 3px 4px rgba(15, 84, 228, 0.75), inset -1px -1px 10px white;
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
  background-color: #0F54E4;
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

.star-rating__stars {
  position: relative;
  height: 5rem;
  width: 25rem;
}
.star-rating__label {
  position: absolute;
  height: 100%;
  background-size: 5rem 5rem;
  background-size: 5rem 5rem;
  background-image: url('@/assets/images/StarEmpty.png');
}
.star-rating__input {
  margin: 0;
  position: absolute;
  height: 1px; width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  display: none;
}
.star-rating__stars .star-rating__label:nth-of-type(1) {
  z-index: 5;
  width: 20%;
}
.star-rating__stars .star-rating__label:nth-of-type(2) {
  z-index: 4;
  width: 40%;
}
.star-rating__stars .star-rating__label:nth-of-type(3) {
  z-index: 3;
  width: 60%;
}
.star-rating__stars .star-rating__label:nth-of-type(4) {
  z-index: 2;
  width: 80%;
}
.star-rating__stars .star-rating__label:nth-of-type(5) {
  z-index: 1;
  width: 100%;
}
.star-rating__input:checked + .star-rating__label,
.star-rating__input:focus + .star-rating__label,
.star-rating__label:hover {
  background-image: url('@/assets/images/StarFilled.png');

}

.star-rating__input:focus ~ .star-rating__focus {
  position: absolute;
  top: -.25em;
  right: -.25em;
  bottom: -.25em;
  left: -.25em;
  outline: 0.25rem solid lightblue;
}
input#stars {
  display: none;
}
</style>