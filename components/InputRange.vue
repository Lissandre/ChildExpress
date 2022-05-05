<template>
  <div
    class="pb-4 text-gray-500 pointer-events-auto relative left-1/3 mt-[100px]"
  >
    <fieldset :class="`animate-bounce-in ${input.class}`">
      <p v-if="input.class != 'bubble-range'">{{ locale }}</p>
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
        class="test"
      />
    </fieldset>
    <span
      v-if="input.class === 'bubble-range'"
      ref="bubble"
      class="bubble"
    ></span>
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
    if (this.$refs.bubble) this.$refs.bubble.innerHTML = 10
  },
  methods: {
    update(e) {
      this.$emit(
        'updateInput',
        this.input.type,
        this.input.name,
        e.target.value
      )
      if (this.input.class.includes('bubble-range')) this.moveDialogue(e.target)
    },
    moveDialogue(el) {
      const val = el.value
      const min = el.min ? el.min : 0
      const max = el.max ? el.max : 100
      const newVal = Number(((val - min) * 100) / (max - min))
      this.$refs.bubble.style.bottom = `calc(${newVal / 2}% + 15px)`
      this.$refs.bubble.innerHTML = newVal
    },
  },
}
</script>


<style scoped>
.range input {
  -webkit-appearance: none; /* également nécessaire sur le curseur */
  width: 10em;
  height: inherit; /* s'adapte à la hauteur de l'input */
  border: none;
  border-radius: 0; /* pris en compte sur Webkit et Edge */
  background: black; /* pris en compte sur Webkit only */
  height: 2px;
}
.range span {
  display: none;
}

.bubble-range input {
  -webkit-appearance: slider-vertical; /* WebKit */
  width: 50px;
  height: 200px;
  padding: 0 24px;
  outline: none;
  background: transparent;
}

.range input::-webkit-slider-thumb,
.bubble-range input::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none; /* également nécessaire sur le curseur */
  height: 2em;
  padding: 0.5em; /* largeur du bord */
  border-radius: 50%;
  box-shadow: 9px 25px 30px rgba(15, 84, 228, 0.56);
  filter: drop-shadow(0px 4px 7px rgba(15, 84, 228, 0.56));
  width: 1em;
  height: inherit; /* s'adapte à la hauteur de l'input */
  background: #0f54e4;
  cursor: pointer;
}

.range input::-moz-range-thumb,
.bubble-range input::-moz-range-thumb {
  -webkit-appearance: none; /* également nécessaire sur le curseur */
  height: 2em;
  padding: 0.5em; /* largeur du bord */
  border-radius: 50%;
  box-shadow: 9px 25px 30px rgba(15, 84, 228, 0.56);
  filter: drop-shadow(0px 4px 7px rgba(15, 84, 228, 0.56));
  width: 1em;
  height: inherit; /* s'adapte à la hauteur de l'input */
  background: #0f54e4;
  cursor: pointer;
}
.range input::-ms-thumb,
.bubble-range input::-ms-thumb {
  -webkit-appearance: none; /* également nécessaire sur le curseur */
  height: 2em;
  padding: 0.5em; /* largeur du bord */
  border-radius: 50%;
  box-shadow: 9px 25px 30px rgba(15, 84, 228, 0.56);
  filter: drop-shadow(0px 4px 7px rgba(15, 84, 228, 0.56));
  width: 1em;
  height: inherit; /* s'adapte à la hauteur de l'input */
  background: #0f54e4;
  cursor: pointer;
}

.bubble-range {
  height: 14em;
  width: 2em;
  position: relative;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.color-range input {
  -webkit-appearance: none; /* également nécessaire sur le curseur */
  width: 10em;
  height: inherit; /* s'adapte à la hauteur de l'input */
  border: none;
  border-radius: 20px; /* pris en compte sur Webkit et Edge */
  background: black; /* pris en compte sur Webkit only */
  height: 10px;
  /*transform: rotate3d(0, 0, 1, 90deg);*/

  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(252, 237, 235, 1) 22%,
    rgba(226, 207, 189, 1) 51%,
    rgba(52, 15, 9, 1) 100%
  );
}

.bubble {
  display: flex;
  left: 60px;
  bottom: 50px;
  z-index: 3;
  background: radial-gradient(
    rgba(0, 0, 0, 0),
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.8)
  );
  z-index: 1;
  perspective-origin: 500% 200%;
  /*transform: perspective(800px) rotate3d(0, 1, 0, -45deg) scale3d(0.9, 0.9, 0.9);*/
  border-radius: 20px;
  position: absolute;
  padding: 15px;
}
</style>