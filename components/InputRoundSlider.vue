<template>
  <div class="relative pointer-events-auto">
    <fieldset
      :class="`
        circle-slider
        animate-bounce-in
        circle-fieldset
        skin-color
        ${input.class}
      `"
      v-if="input.skinColor"
    ></fieldset>

    <fieldset
      :class="`
        circle-slider
        animate-bounce-in
        circle-fieldset
        health-fieldset
        ${input.class}
      `"
      v-if="!input.skinColor"
      ref="circleSlider"
    >
      <circle-slider
        v-model="sliderValue"
        :side="150"
        :min="sliderMin"
        :max="sliderMax"
        :step-size="1"
        :circle-width-rel="20"
        :progress-width-rel="10"
        :circleColor="'transparent'"
        :progressColor="'#0F54E4'"
        :knobColor="'transparent'"
      ></circle-slider>
      <img
        src="@/assets/images/heart.svg"
        class="heart"
        alt=""
        v-if="this.input.name.includes('health')"
      />
      <p class="IQvalue" ref="IQvalue" v-if="this.input.name.includes('IQ')">
        {{ this.sliderValue }}
      </p>

      <svg
        width="175px"
        height="175px"
        viewBox="0 0 150 150"
        class="fake-background"
        v-if="!this.input.name.includes('IQ')"
      >
        <g>
          <defs>
            <radialGradient id="myGradient">
              <stop offset="0%" stop-color="rgba(0, 0, 0, 0)" />
              <stop offset="33%" stop-color="rgba(255, 255, 255, 0.1)" />
              <stop offset="66%" stop-color="rgba(255, 255, 255, 0.4)" />
              <stop offset="100%" stop-color="rgba(255, 255, 255, 0.8)" />
            </radialGradient>
          </defs>
          <circle cx="75" cy="75" r="70" fill="url(#myGradient) "></circle>
          <circle
            cx="75"
            cy="75"
            r="40"
            fill="transparent"
            class="center-circle"
          ></circle>
        </g>
        <g></g>
      </svg>
      <svg
        width="175px"
        height="175px"
        viewBox="0 0 150 150"
        class="fake-background"
        v-if="this.input.name.includes('IQ')"
      >
        <g>
          <circle
            cx="75"
            cy="75"
            r="40"
            fill="transparent"
            class="center-circle"
          ></circle>
        </g>
        <g></g>
      </svg>
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
      sliderValue: 50,
      sliderMin: this.input.name.includes('IQ') ? 50 : 0,
      sliderMax: this.input.name.includes('IQ') ? 250 : 100,
    }
  },
  mounted() {
    if (this.input.skinColor) {
      console.log('proudz')
    } else if (this.input.name.includes('IQ')) {
      console.log('here')
      this.$refs['circleSlider'].children[0].appendChild(this.$refs['IQvalue'])
      this.sliderValue = 100
    }
  },
  watch: {
    sliderValue(newValue, oldValue) {
      this.$emit(
        'updateInput',
        this.input.type,
        this.input.name,
        newValue,
        this.sliderMax
      )
      if (this.input.name.includes('IQ')) this.$emit('updateIQ', newValue)
    },
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
    checkValue() {
      console.log('prout')
    },
  },
}
</script>

<style>
.circle-slider svg g path {
  stroke-linecap: round;
  transition: stroke-width ease-out 0.2s;
}
.circle-slider svg:hover > g path {
  stroke-width: 10px;
}

.health-slider svg g path {
  stroke: #0f54e4 !important;
}
.circle-slider svg {
  -webkit-filter: drop-shadow(5px 4px 7px rgba(15, 84, 228, 63%));
  filter: drop-shadow(5px 4px 7px rgba(15, 84, 228, 63%));
  cursor: pointer;
}
.circle-fieldset {
  background: none;
  filter: none;
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
}

.skin-color circle {
  transform: rotate3d(0, 0, 1, -90deg);
  transform-origin: center;
}

.center-slider {
  z-index: 100;
  background-blend-mode: saturation;
}
.fake-background,
.heart {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  transition: all ease-out 0.5s;
  z-index: -1;
}

.heart {
  z-index: 1;
}

.IQvalue {
  color: black;
  font-size: 32px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.IQ {
  box-shadow: inset 0px 11.5px 20px white, inset -5.82px -4.5px 6.5px 0px white;
  left: 15%;
  top: 30vh;
}

.IQ div svg circle:first-of-type {
  stroke: white;
  stroke-width: 2px;
}
</style>
