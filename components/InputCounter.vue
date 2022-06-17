<template>
  <div class="pb-4 text-gray-500 left-1/3 pointer-events-auto counter-wrapper">
    <fieldset :class="`animate-bounce-in relative w-fit ${input.class}`">
      <button @click="(e) => update(e, 'plus')" class="text-blue text-4xl">
        +
      </button>
      <div class="content">
        <h2>{{ counterValue }}</h2>
        <p>{{ input.unit }}</p>
      </div>
      <button @click="(e) => update(e, 'minus')" class="text-blue text-4xl">
        -
      </button>
    </fieldset>
    <p class="counter-label">{{ locale.label1 }}</p>
  </div>
</template>

<script>
export default {
  name: 'InputCounter',
  props: ['input', 'locale'],

  data() {
    return {
      counterValue: this.input.value,
    }
  },
  mounted() {},
  methods: {
    update(e, way) {
      e.preventDefault()
      if (way === 'plus') {
        this.counterValue++
      } else {
        this.counterValue--
      }
      this.$emit(
        'updateInput',
        this.input.type,
        this.input.name,
        this.counterValue / 4
      )
    },
  },
}
</script>

<style scoped>
fieldset button {
  background: radial-gradient(
    rgba(0, 0, 0, 0),
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.8)
  );
  transition: all ease-out 0.2s;
  z-index: 1;
  perspective-origin: 500% 200%;
  /*transform: perspective(800px) rotate3d(0, 1, 0, -45deg) scale3d(0.9, 0.9, 0.9);*/
  transform: scale3d(0.8, 0.8, 0.8);
  border-radius: 34px;
  height: 60px;
  width: 60px;
}
fieldset button:hover {
  transform: scale3d(1, 1, 1);
}
fieldset .content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h2 {
  font-size: 36px;
  margin-right: 5px;
}
.counter-label {
  color: white;
  font-size: 22px;
}
</style>
