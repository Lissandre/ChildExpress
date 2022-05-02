<template>
  <div
    class="pb-4 text-gray-500 pointer-events-auto relative left-1/4 mt-[100px]"
  >
    <fieldset>
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
        class="test"
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
input[type='range'] {
  -webkit-appearance: none; /* également nécessaire sur le curseur */
  width: 10em;
  height: inherit; /* s'adapte à la hauteur de l'input */
  border: none;
  border-radius: 0; /* pris en compte sur Webkit et Edge */
  background: black; /* pris en compte sur Webkit only */
  height: 2px;
}

input[type='range'].test::-webkit-slider-thumb {
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

input[type='range'].test::-moz-range-thumb {
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
input[type='range'].test::-ms-thumb {
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
</style>