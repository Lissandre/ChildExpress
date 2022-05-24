<template>
  <div class="flex flex-col relative h-full w-full" style="overflow: hidden">
    <form
      @submit.prevent="prevent"
      id="form1"
      class="absolute h-full w-full flex flex-col justify-center"
    >
      <h1 class="absolute left-1/3 top-1/4 text-white z-[1] text-3xl">
        Quelques infos sur vous
      </h1>

      <div class="my-slider">
        <div>
          <component
            v-if="input.class.includes('slide1')"
            v-for="input in inputs"
            :key="input.name"
            :is="input.component"
            :input="input"
            v-on:updateInput="(a, b, c) => $helpers.updateInput(a, b, c)"
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
        <div>
          <component
            v-for="input in inputs"
            v-if="input.class.includes('slide2')"
            :key="input.name"
            :is="input.component"
            :input="input"
            v-on:updateInput="(a, b, c) => $helpers.updateInput(a, b, c)"
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
</style>