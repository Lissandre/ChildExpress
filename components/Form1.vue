<template>
  <div class="flex flex-col relative h-full w-full" style="overflow: hidden">
    <form
      @submit.prevent="prevent"
      id="form1"
      class="absolute h-full w-full flex flex-col justify-center"
    >
      <div class="my-slider">
        <div class="first-slide">
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
        <div class="second-slide">
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
              <span>Date de fabrication :</span>
              <span> {{ getTodayDate() }}</span>
            </div>
            <div class="society">
              <span>Société de naissance :</span>
              <img src="" alt="" />
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
      this.$refs.inputs.forEach((input) => {
        const fieldset = input.$el.getElementsByTagName('fieldset')[0]
        if (fieldset) {
          fieldset.classList.remove('animate-bounce-in')
          fieldset.classList.add('animate-bounce-out')
        }
      })
      setTimeout(() => {
        this.$helpers.updateInput(e.type, e.type, e.type)
      }, 1000)
    },
    inputChange(type, name, value, optional) {
      this.$helpers.updateInput(type, name, value)

      if ((type === 'radio' || type === 'roundSlider') && name !== 'gender') {
        console.log(value, optional)
        value = value / optional
        console.log(value)
      }
      $nuxt.$emit('updateSound', 'form1', type, name, value)

      console.log(this.store.ranges)
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
  border-radius: 34px;
  box-shadow: 0 1px 9px #fff;
}

.second-slide {
  background: none;
  transition: all ease-out 0.2s;
  z-index: 1;
  perspective-origin: 500% 200%;
  border-radius: 34px;
  box-shadow: inset 0px 11.5px 20px white, inset -5.82px -4.5px 6.5px 0px white;
  display: flex;
  flex-wrap: wrap;
}

.second-slide .slide2 {
  background: none !important;
}

.second-slide .submit-wrapper {
  position: absolute;
  bottom: 0;
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
  justify-content: center;
  align-items: center;
}

.framed_title {
  font-size: 42px;
  text-shadow: 0px 1px 32px white;
  color: white;
}

.card_bottom {
  font-size: 16px;
  color: white;
}

.second-slide-component {
  position: relative;
  width: 100%;
  height: 100px;
}
</style>

<style scoped>
.first-slide,
.second-slide {
  width: 800px;
  height: 60%;
  max-height: 1200px;
  min-height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-150%, -50%);
  font-family: 'NeueMontreal';
}

.first-slide {
  width: 80vw;
  left: 65%;
}

.second-slide {
  width: 800px;
  left: 100%;
  padding: 52px 63px;
}
</style>