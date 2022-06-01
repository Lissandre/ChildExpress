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
            v-on:updateInput="(type, name, value, optional) => this.inputChange(type, name, value, optional)"
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
          <h2>Carte d'identité</h2>
          <component
            v-for="input in inputs"
            v-if="input.class.includes('slide2')"
            :key="input.name"
            :is="input.component"
            :input="input"
            v-on:updateInput="(type, name, value, optional) => this.inputChange(type, name, value, optional)"
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

    var slider = tinySlider.tns({
      container: '.my-slider',
      slideBy: 'page',
      loop: false,
      rewind: false,
      controlsText: ['', '']
    })
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
      $helpers.updateInput(type, name, value); 

      console.log(type)
      if(type === 'radio') {
        value = value / optional
      }
      $nuxt.$emit('updateSound', 'form1', type, name, value)
    }

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


<style> @import "https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/tiny-slider.css";
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
}

.second-slide .slide2 {
  background: none !important;
}

.second-slide .submit-wrapper {
  position: absolute;
  bottom: 0;
}

</style>

<style scoped>
.first-slide, .second-slide {
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
}
</style>