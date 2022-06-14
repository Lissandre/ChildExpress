<template>
  <div class="flex flex-col relative h-full w-full" style="overflow: hidden">
    <form
      @submit.prevent="prevent"
      id="form1"
      class="absolute h-full w-full flex flex-col justify-center"
    >
      <div class="my-slider">
        <div class="first-slide">
          <div class="first-slide-wrapper">
            <component
              v-for="input in inputs"
              v-if="input.class.includes('slide1')"
              :key="input.name"
              :is="input.component"
              :input="input"
              v-on:updateInput="
                (type, name, value, optional) =>
                  inputChange(type, name, value, optional)
              "
              ref="inputs"
              :locale="
                $t(
                  `form1.${slugify(`${input.type}_${input.name}`, {
                    replacement: '_',
                    lower: true,
                  })}`
                )
              "
            ></component>
          </div>
        </div>
        <div class="second-slide">
          <div class="second-slide-wrapper">
            <div class="framed">
              <span class="interrogation neueBit">?</span>
            </div>
            <div class="framed_inputs">
              <h2 class="framed_title">Carte d'identité du bébé</h2>
              <component
                v-for="input in inputs"
                v-if="input.class.includes('slide2')"
                :key="input.name"
                :is="input.component"
                :input="input"
                v-on:updateInput="
                  (type, name, value, optional) =>
                    inputChange(type, name, value, optional)
                "
                ref="inputs"
                :locale="
                  $t(
                    `form1.${slugify(`${input.type}_${input.name}`, {
                      replacement: '_',
                      lower: true,
                    })}`
                  )
                "
                class="second-slide-component"
              ></component>
            </div>
            <div class="card_bottom">
              <div class="creation_date">
                <span class="neueBit label">Date de fabrication :</span>
                <span> {{ getTodayDate() }}</span>
              </div>
              <div class="society">
                <span class="neueBit label">Société de naissance :</span>
                <div class="logo"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from '@/stores/'
import { form1 } from '@/data/forms.json'
import slugify from 'slugify'
import files from '~/locales/en'

let tinySlider = null

if (process.client) {
  tinySlider = require('tiny-slider')
}

export default {
  name: 'Form1',
  data() {
    return {
      name: 'form1',
      inputs: [],
      slugify: slugify,
    }
  },
  setup() {
    const store = useStore()
    return { store }
  },
  mounted() {
    this.inputs = form1.inputs


console.log(this.inputs)
    this.slider = tinySlider.tns({
      container: '.my-slider',
      slideBy: 'page',
      loop: false,
      rewind: false,
      controlsText: ['', ''],
    })

    this.soundEvents()
  },
  methods: {
    prevent(e) {
      e.preventDefault()
      const fieldset = this.$el.querySelector('.second-slide-wrapper')
      console.log(fieldset)
      if (fieldset) {
        fieldset.classList.add('animate-bounce-out')
      }
      setTimeout(() => {
        this.$helpers.updateInput(e.type, e.type, e.type, 'form1')
      }, 1000)
    },
    inputChange(type, name, value, optional) {
      this.$helpers.updateInput(type, name, value, 'form1')

      if ((type === 'radio' || type === 'roundSlider') && name !== 'gender') {
        console.log(value, optional)
        value = value / optional
        console.log(value)
      }
      $nuxt.$emit('updateSound', 'form1', type, name, value)
    },
    soundEvents() {
      requestAnimationFrame(() => {
        if ($nuxt)
          $nuxt.$emit('updateSound', 'form1', 'speech', 'intro', 'speech1')
      })

      this.slider.events.on('indexChanged', () => {
        $nuxt.$emit('updateSound', 'form1', 'speech', 'identity', 'speech1')
      })
    },

    getTodayDate() {
      var today = new Date()
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
      var yyyy = today.getFullYear()

      if (this.$i18n.locale) today = dd + '/' + mm + '/' + yyyy
      else today = mm + '/' + dd + '/' + yyyy
      return today
    },

    /*changeZindex(e) {
      const form1 = document.getElementById('form1')
      if (form1.classList.contains('behind')) {
        form1.classList.remove('behind')
      } else {
        form1.classList.add('behind')
      }
    },*/
  },
}
</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/tiny-slider.css';
.first-slide {
}

.first-slide fieldset {
  background: none;
  border: 1px solid white;
  border-radius: 20px;
}

.second-slide-wrapper {
  background: none;
  transition: all ease-out 0.2s;
  z-index: 1;
  perspective-origin: 500% 200%;
  border-radius: 34px;
  box-shadow: inset 0px 11.5px 20px white, inset -5.82px -4.5px 6.5px 0px white;
  display: flex;
  flex-wrap: wrap;
}

.second-slide .second-slide-component {
   background: none !important;
}

.second-slide .submit-wrapper {
  position: absolute;
  bottom: 0;
  right: 0;
}
.second-slide .submit-wrapper > input {
  position: absolute;
  right: -50%;
  bottom: -200%;
}
.framed {
  width: 256px;
  height: 338px;
  box-shadow: inset 0px 3.5px 11.5px rgba(3, 86, 104, 0.25),
    inset -4.13px -3.3px 14.33px 0px white;
  border-radius: 23px;
}

.interrogation,
.framed {
  display: flex;
  justify-content: center;
  align-items: center;
}
.interrogation {
  font-size: 256px;
  text-shadow: 0px 1px 32px white;
  color: white;
}

.framed_inputs {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 65%;
  padding-bottom: 80px;
  position: relative;
}

.framed_title {
  font-size: 52px;
  text-shadow: 0px 1px 32px white;
  color: white;
  margin-left: 30px;
  font-family: 'NeueBit';
  font-weight: 700;
}

.card_bottom {
  font-size: 16px;
  color: white;
  position: relative;
  width: 100%;
}

.creation_date,
.society {
  width: fit-content;
  display: inline-block;
  position: relative;
  padding: 20px;
  font-size: 18px;
}
.creation_date .label,
.society .label {
  font-size: 24px;
}

.creation_date {
  margin-right: 40px;
}

.card_bottom::before {
  content: '';
  width: 100%;
  height: 1px;
  background: white;
  position: absolute;
  top: 0;
}
.creation_date::after {
  content: '';
  width: 1px;
  height: 30px;
  background: white;
  position: absolute;
  right: -20px;
}

.logo {
  background: no-repeat center center url('@/assets/images/logo.svg');
  height: 30px;
  width: 200px;
  color: black;
  display: inline-block;
  vertical-align: middle;
}

.second-slide-component {
  position: relative;
  width: 100%;
  height: 100px;
  left: auto;
  bottom: auto;
  padding-left: 0;
  padding-right: 0;
  margin-top: 0;
}

.weight,
.weight button {
  background: radial-gradient(
    rgba(0, 0, 0, 0),
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.8)
  ) !important;
}

.counter-wrapper{
      border: 1px solid white;
    width: fit-content;
    padding: 20px;
    border-radius: 20px;
}
</style>

<style scoped>
.first-slide,
.second-slide {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.second-slide {
  position: absolute;
  left: 50%;
}

.first-slide-wrapper,
.second-slide-wrapper {
  width: 800px;
  height: 60%;
  max-height: 1200px;
  min-height: 500px;
}

.first-slide-wrapper {
  width: 80vw;
  left: 65%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.second-slide-wrapper {
  width: 900px;
  height: fit-content;
  padding: 52px 63px;
}
</style>
