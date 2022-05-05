<template>
  <div class="bottom-1/2 pb-4 text-gray-500 left-1/ pointer-events-auto">
    <fieldset class="circle-slider">
      <circle-slider
        v-model="sliderValue"
        :side="150"
        :min="0"
        :max="10000"
        :step-size="100"
        :circle-width-rel="20"
        :progress-width-rel="10"
        :circleColor="'transparent'"
        :progressColor="'#0F54E4'"
        :knobColor="'transparent'"
      ></circle-slider>
    </fieldset>
  </div>
</template>

<script>
import Vue from 'vue'
import VueCircleSlider from 'vue-circle-slider'
Vue.use(VueCircleSlider)

export default {
  name: 'InputRoundSlider',
  props: ['input', 'locale'],

  data() {
    return {
      sliderValue: 1000,
    }
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

<style>
.circle-slider svg g path {
  stroke: #0f54e4 !important;
  stroke-linecap: round;
}
.circle-slider svg  {
  -webkit-filter: drop-shadow(5px 4px 7px rgba(15, 84, 228, 63%));
  filter: drop-shadow(5px 4px 7px rgba(15, 84, 228, 63%));
  cursor: pointer;
}
</style>
