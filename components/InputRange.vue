<template>
  <div
    class="pb-4 text-gray-500 pointer-events-auto relative left-60 mt-[100px]"
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
        ref="input"
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
let three = null
if (process.client) {
  three = require('three')
}
export default {
  name: 'InputRange',
  props: ['input', 'locale'],

  data() {
    return {
      finalColor: new three.Color('#FFD1A6'),

      color1: {
        a : new three.Color('#FDDCD2'),
        b : new three.Color('#F5C09E'),
        c : new three.Color('#F2AA91'),
      },
      color2: {
        a : new three.Color('#FCE9D0'),
        b : new three.Color('#FFD1A6'),
        c : new three.Color('#F9AD73'),
      },
      color3: {
        a : new three.Color('#DBB387'),
        b : new three.Color('#CC8E4A'),
        c : new three.Color('#D08847'),
      },
      color4: {
        a : new three.Color('#B25C20'),
        b : new three.Color('#935F41'),
        c : new three.Color('#553117'),
      },

      sliderTint: '',
      sliderType: '',
    }
  },
  mounted() {
    this.sliderTint = document.querySelector('.skinTint input')
    this.sliderType = document.querySelector('.skinType input')
    if (this.$refs.bubble) this.$refs.bubble.innerHTML = 10

    
    // To refactor, some day
    if (this.input.class.includes('color-range')) {
      this.sliderTint.style.setProperty('--background1', `rgba(${this.finalColor.r * 255}, ${this.finalColor.g * 255}, ${this.finalColor.b * 255}, 1)`)
      this.sliderType.style.setProperty('--background2', `rgba(${this.finalColor.r * 255}, ${this.finalColor.g * 255}, ${this.finalColor.b * 255}, 1)`)
      this.sliderType.style.setProperty('--skinType1', `rgb(${this.color2.a.r * 255}, ${this.color2.a.g * 255}, ${this.color2.a.b * 255})`)
      this.sliderType.style.setProperty('--skinType2', `rgb(${this.color2.b.r * 255}, ${this.color2.b.g * 255}, ${this.color2.b.b * 255})`)
      this.sliderType.style.setProperty('--skinType3', `rgb(${this.color2.c.r * 255}, ${this.color2.c.g * 255}, ${this.color2.c.b * 255})`)
      this.variation = 'a'
    }
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
      else if (this.input.class.includes('color-range')) this.updateThumb(e)
    },
    moveDialogue(el) {
      const val = el.value
      const min = el.min ? el.min : 0
      const max = el.max ? el.max : 100
      const newVal = Number(((val - min) * 100) / (max - min))
      this.$refs.bubble.style.bottom = `calc(${newVal / 2}% + 15px)`
      this.$refs.bubble.innerHTML = newVal
    },

    updateThumb(e) {
      // Skin tone and shiet
      if (this.sliderType.value < 1 / 3) this.variation = 'a'
      else if (this.sliderType.value < 2 / 3) this.variation = 'b'
      else if (this.sliderType.value < 1) this.variation = 'c'

      // Skin Tint and final color
      this.v = this.sliderTint.value
        if (this.v < 1 / 4) {
          const var1 = this.color1.a
          const var2 = this.color1.b
          const var3 = this.color1.c
          // this.finalColor.lerpColors(this.color1.a, this.color1.c, this.v * 4)
          this.finalColor.lerpColors(this.color1[this.variation], this.color1[this.variation], this.v * 4)
          this.sliderType.style.setProperty('--skinType1', `rgb(${var1.r * 255}, ${var1.g * 255}, ${var1.b * 255})`)
          this.sliderType.style.setProperty('--skinType2', `rgb(${var2.r * 255}, ${var2.g * 255}, ${var2.b * 255})`)
          this.sliderType.style.setProperty('--skinType3', `rgb(${var3.r * 255}, ${var3.g * 255}, ${var3.b * 255})`)
        }
        else if (this.v < 2 / 4) {
          const var1 = this.color2.a
          const var2 = this.color2.b
          const var3 = this.color2.c
          this.finalColor.lerpColors(this.color2[this.variation], this.color3[this.variation], this.v * 4 - (3 / 4))
          this.sliderType.style.setProperty('--skinType1', `rgb(${var1.r * 255}, ${var1.g * 255}, ${var1.b * 255})`)
          this.sliderType.style.setProperty('--skinType2', `rgb(${var2.r * 255}, ${var2.g * 255}, ${var2.b * 255})`)
          this.sliderType.style.setProperty('--skinType3', `rgb(${var3.r * 255}, ${var3.g * 255}, ${var3.b * 255})`)
        }
        else if (this.v < 3 / 4){
          const var1 = this.color3.a
          const var2 = this.color3.b
          const var3 = this.color3.c
          this.finalColor.lerpColors(this.color3[this.variation], this.color4[this.variation], this.v * 4 - (2 / 4))
          this.sliderType.style.setProperty('--skinType1', `rgb(${var1.r * 255}, ${var1.g * 255}, ${var1.b * 255})`)
          this.sliderType.style.setProperty('--skinType2', `rgb(${var2.r * 255}, ${var2.g * 255}, ${var2.b * 255})`)
          this.sliderType.style.setProperty('--skinType3', `rgb(${var3.r * 255}, ${var3.g * 255}, ${var3.b * 255})`)
        }
        else if (this.v < 1){
          const var1 = this.color4.a
          const var2 = this.color4.b
          const var3 = this.color4.c
          this.finalColor.lerpColors(this.color4[this.variation], new three.Color('#000000'), this.v * 4 - (1 / 4))
          this.sliderType.style.setProperty('--skinType1', `rgb(${var1.r * 255}, ${var1.g * 255}, ${var1.b * 255})`)
          this.sliderType.style.setProperty('--skinType2', `rgb(${var2.r * 255}, ${var2.g * 255}, ${var2.b * 255})`)
          this.sliderType.style.setProperty('--skinType3', `rgb(${var3.r * 255}, ${var3.g * 255}, ${var3.b * 255})`)
        }
      console.log(this.finalColor.r)

      // Change thumb
      e.target.style.setProperty(
        this.input.class.includes('skinTint') ? '--background1' : '--background2',
        `rgba(${this.finalColor.r * 255}, ${this.finalColor.g * 255}, ${
          this.finalColor.b * 255
        }, 1)`
      )
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
  box-shadow: 0px 4px 7px rgba(15, 84, 228, 0.56);
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
  box-shadow: 0px 4px 7px rgba(15, 84, 228, 0.56);
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
  box-shadow: 0px 4px 7px rgba(15, 84, 228, 0.56);
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

.color-range {
  position: relative;
  width: 20px !important;
  height: 200px;
}

.color-range input {
  -webkit-appearance: none; /* également nécessaire sur le curseur */
  width: 10em;
  height: inherit; /* s'adapte à la hauteur de l'input */
  border: none;
  border-radius: 20px; /* pris en compte sur Webkit et Edge */
  background: black; /* pris en compte sur Webkit only */
  height: 10px;

  transform: rotate3d(0, 0, 1, 90deg) translate3d(50%, 50%, 0);
  position: absolute;
  left: -140%;
  top: 8%;

  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(252, 237, 235, 1) 22%,
    rgba(226, 207, 189, 1) 51%,
    rgba(52, 15, 9, 1) 100%
  );
}

.skinType input {
    background: linear-gradient(
    90deg,
    var(--skinType1),
    var(--skinType2) 50%,
    var(--skinType3) 100%
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

#skinTint,
#skinType {
  box-shadow: none;
}
#skinTint::-webkit-slider-thumb {
  background: var(--background1);
}
#skinTint::-moz-range-thumb {
  background: var(--background1);
}
#skinTint::-ms-thumb {
  background: var(--background1);
}

#skinType::-webkit-slider-thumb {
  background: var(--background2);
}
#skinType::-moz-range-thumb {
  background: var(--background2);
}
#skinType::-ms-thumb {
  background: var(--background2);
}
</style>