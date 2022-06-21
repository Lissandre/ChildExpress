<template>
  <div class="relative pointer-events-auto w-[300px] h-[200px]">
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
    <label class="w-20 mr-3 w-max text-white absolute">{{ locale.label1 }}</label>

      <p class="IQvalue" ref="IQvalue" v-if="this.input.name.includes('headSize')">
        {{ this.sliderValue }}
      </p>
      <circle-slider
        v-model="sliderValue"
        :side="150"
        :min="sliderMin"
        :max="sliderMax"
        :step-size="0.5"
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
        v-if="this.input.name.includes('health') || this.input.name.includes('parentHealth')"
      />

      <svg
        width="175px"
        height="175px"
        viewBox="0 0 150 150"
        class="fake-background"
        v-if="!this.input.name.includes('headSize')"
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
        v-if="this.input.name.includes('headSize')"
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
import { useStore } from '@/stores'

Vue.use(VueCircleSlider)

export default {
  name: 'InputRoundSlider',
  props: ['input', 'locale'],

  data() {
    return {
      sliderValue: 4,
      sliderMin: this.input.name.includes('headSize') ? 50 : 0,
      sliderMax: this.input.name.includes('headSize') ? 250 : 8,
    }
  },
  setup() {
    const store = useStore()
    return { store }
  },
  mounted() {
    if (this.input.skinColor) {
    } else if (this.input.name.includes('headSize')) {
      this.$refs['circleSlider'].appendChild(this.$refs['IQvalue'])
      this.sliderValue = 100
    } else if(this.input.name.includes('health')) {
      this.store.$onAction(({ name, store, args, after, onError }) => {
        if (name != 'changeOverallSize') return
        after(
          (result) => {
            this.sliderValue = this.store.overallSize
          },
          { once: true }
        )
      })
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
      if (this.input.name.includes('headSize')) this.$emit('updateIQ', newValue)
      if(this.input.name.includes('health')) {
        this.store.changeOverallSize(newValue)
      }
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
    checkValue() {},
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
  font-size: 42px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-top: 13px;
}

.IQ {
  box-shadow: inset 0px 11.5px 20px white, inset -5.82px -4.5px 6.5px 0px white;
  top: 20%;
  left: 100%;
  padding-bottom: 50px;
}


.IQ div {
  top: 26px;
  position: relative;
}
.IQ div svg {
  filter: drop-shadow(5px 4px 7px white);
}
.IQ div svg circle:first-of-type {
  stroke: white;
  stroke-width: 2px;
}

.IQ div svg path {
  filter: drop-shadow(5px 4px 7px rgba(15, 84, 228, 33%));
}

.IQ label {
      left: 50%;
    transform: translateX(-50%);
}

.circle-slider.slide1 {
  padding: 60px;
}

.slide1 label {
  font-size: 22px;
  left: 20px;
  top: 20px;
}
</style>
