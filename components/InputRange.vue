<template>
  <div class="text-gray-500 pointer-events-auto relative">
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
        ref="input"
      />
    </fieldset>
    <span
      v-if="input.class.includes('bubble-range')"
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

      type1: {
        light: new three.Color('#fcdcd2'),
        medium: new three.Color('#F5C09E'),
        dark: new three.Color('#F2AA91'),
      },
      type2: {
        light: new three.Color('#F9DCB2'),
        medium: new three.Color('#FFDDBF'),
        dark: new three.Color('#F9AD73'),
      },
      type3: {
        light: new three.Color('#DBB288'),
        medium: new three.Color('#CC8E4A'),
        dark: new three.Color('#CC7D36'),
      },
      type4: {
        light: new three.Color('#B86933'),
        medium: new three.Color('#874C2B'),
        dark: new three.Color('#543117'),
      },

      sliderTint: '',
      sliderType: '',
    }
  },
  mounted() {
    this.sliderTint = document.querySelector('.skinTint input')
    this.sliderType = document.querySelector('.skinType input')
    this.hasForm1 = document.querySelector('#form1')

    this.initializeDialogue()

    // To refactor, some day
    /*if (this.input.class.includes('color-range')) {
      this.sliderTint.style.setProperty('--background1', `rgba(${this.finalColor.r * 255}, ${this.finalColor.g * 255}, ${this.finalColor.b * 255}, 1)`)
      this.sliderType.style.setProperty('--background2', `rgba(${this.finalColor.r * 255}, ${this.finalColor.g * 255}, ${this.finalColor.b * 255}, 1)`)
      this.sliderType.style.setProperty('--skinType1', `rgb(${this.color2.a.r * 255}, ${this.color2.a.g * 255}, ${this.color2.a.b * 255})`)
      this.sliderType.style.setProperty('--skinType2', `rgb(${this.color2.b.r * 255}, ${this.color2.b.g * 255}, ${this.color2.b.b * 255})`)
      this.sliderType.style.setProperty('--skinType3', `rgb(${this.color2.c.r * 255}, ${this.color2.c.g * 255}, ${this.color2.c.b * 255})`)
      this.variation = 'a'
    }*/
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

    initializeDialogue() {
      if (this.$refs.bubble) {
        if (this.hasForm1) this.$refs.bubble.innerHTML = '1' + 50 + ' cm'
        else this.$refs.bubble.innerHTML = 50 + ' cm'
        this.$refs.bubble.style.bottom = `calc(${100 / 2}% + 15px)`
      }
    },
    moveDialogue(el) {
      const val = el.value
      const min = el.min ? el.min : 0
      const max = el.max ? el.max : 100
      const newVal = Number(((val - min) * 100) / (max - min)).toFixed(0)
      this.$refs.bubble.style.bottom = `calc(${newVal / 2}% + 15px)`

      if (this.hasForm1) this.$refs.bubble.innerHTML = '1' + newVal + ' cm'
      else this.$refs.bubble.innerHTML = newVal + ' cm'
    },

    updateThumb(e) {
      // Skin tone and shiet
      this.variation = { type: undefined, tint: undefined }
      if (this.sliderType.value < 1 / 3)
        var selectedType = new three.Color('#F5C09E').lerp(
          new three.Color('#FFDDBF'),
          this.sliderType.value * 3
        )
      else if (this.sliderType.value < 2 / 3)
        var selectedType = new three.Color('#F5C09E').lerp(
          new three.Color('#FFDDBF'),
          this.sliderType.value * 3
        )
      else if (this.sliderType.value < 1)
        var selectedType = new three.Color('#F5C09E').lerp(
          new three.Color('#FFDDBF'),
          this.sliderType.value * 3
        )

      if (this.sliderTint.value < 1 / 2) {
        var selectedTint = {
          t1: new three.Color('#fcdcd2').lerp(
            new three.Color('#F5C09E'),
            this.sliderTint.value * 2
          ),
          t2: new three.Color('#F9DCB2').lerp(
            new three.Color('#FFDDBF'),
            this.sliderTint.value * 2
          ),
          t3: new three.Color('#DBB288').lerp(
            new three.Color('#CC8E4A'),
            this.sliderTint.value * 2
          ),
          t4: new three.Color('#B86933').lerp(
            new three.Color('#874C2B'),
            this.sliderTint.value * 2
          ),
        }
      } else {
        var selectedTint = {
          t1: new three.Color('#F5C09E').lerp(
            new three.Color('#F2AA91'),
            (this.sliderTint.value - 0.5) * 2
          ),
          t2: new three.Color('#FFDDBF').lerp(
            new three.Color('#F9AD73'),
            (this.sliderTint.value - 0.5) * 2
          ),
          t3: new three.Color('#CC8E4A').lerp(
            new three.Color('#CC7D36'),
            (this.sliderTint.value - 0.5) * 2
          ),
          t4: new three.Color('#874C2B').lerp(
            new three.Color('#543117'),
            (this.sliderTint.value - 0.5) * 2
          ),
        }
      }

      this.sliderType.style.setProperty(
        '--skinType1',
        `rgb(${selectedTint.t1.r * 255}, ${selectedTint.t1.g * 255}, ${
          selectedTint.t1.b * 255
        })`
      )
      this.sliderType.style.setProperty(
        '--skinType2',
        `rgb(${selectedTint.t2.r * 255}, ${selectedTint.t2.g * 255}, ${
          selectedTint.t2.b * 255
        })`
      )
      this.sliderType.style.setProperty(
        '--skinType3',
        `rgb(${selectedTint.t3.r * 255}, ${selectedTint.t3.g * 255}, ${
          selectedTint.t3.b * 255
        })`
      )
      this.sliderType.style.setProperty(
        '--skinType4',
        `rgb(${selectedTint.t4.r * 255}, ${selectedTint.t4.g * 255}, ${
          selectedTint.t4.b * 255
        })`
      )

      this.sliderTint.style.setProperty(
        '--skinTint1',
        `rgb(${selectedTint.t1.r * 255}, ${selectedTint.t1.g * 255}, ${
          selectedTint.t1.b * 255
        })`
      )
      this.sliderTint.style.setProperty(
        '--skinTint2',
        `rgb(${selectedTint.t2.r * 255}, ${selectedTint.t2.g * 255}, ${
          selectedTint.t2.b * 255
        })`
      )
      this.sliderTint.style.setProperty(
        '--skinTint3',
        `rgb(${selectedTint.t3.r * 255}, ${selectedTint.t3.g * 255}, ${
          selectedTint.t3.b * 255
        })`
      )

      // Skin Tint and final color
      this.v = this.sliderTint.value
      /*if (this.v < 1 / 4) {
          const var1 = this.color1.a
          const var2 = this.color1.b
          const var3 = this.color1.c
          // this.finalColor.lerpColors(this.color1.a, this.color1.c, this.v * 4)
          this.finalColor.lerpColors(this.color1[this.variation], this.color1[this.variation], this.v * 4)
          this.sliderType.style.setProperty('--skinType1', `rgb(${var1.r * 255}, ${var1.g * 255}, ${var1.b * 255})`)
          this.sliderType.style.setProperty('--skinType2', `rgb(${var2.r * 255}, ${var2.g * 255}, ${var2.b * 255})`)
          this.sliderType.style.setProperty('--skinType3', `rgb(${var3.r * 255}, ${var3.g * 255}, ${var3.b * 255})`)
          this.sliderType.style.setProperty('--skinType4', `rgb(${var3.r * 255}, ${var3.g * 255}, ${var3.b * 255})`)
        } */

      // Change thumb
      e.target.style.setProperty(
        this.input.class.includes('skinTint')
          ? '--background1'
          : '--background2',
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
  height: 350px;
  padding: 0 24px;
  outline: none;
  background: transparent;
}

.range input::-webkit-slider-thumb,
.bubble-range input::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none; /* également nécessaire sur le curseur */
  height: 2rem;
  padding: 0.5rem; /* largeur du bord */
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
  height: 2rem;
  padding: 0.5rem; /* largeur du bord */
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
  height: 2rem;
  padding: 0.5rem; /* largeur du bord */
  border-radius: 50%;
  box-shadow: 0px 4px 7px rgba(15, 84, 228, 0.56);
  filter: drop-shadow(0px 4px 7px rgba(15, 84, 228, 0.56));
  width: 1em;
  height: inherit; /* s'adapte à la hauteur de l'input */
  background: #0f54e4;
  cursor: pointer;
}

.bubble-range {
  height: 25rem;
  width: 2rem;
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
  width: 10rem;
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

.height-range input {
  transform: rotate3d(0, 0, 1, 90deg) translate3d(50%, 50%, 0);
}

.skinType input {
  background: linear-gradient(
    90deg,
    var(--skinType1),
    var(--skinType2) 33%,
    var(--skinType3) 66%,
    var(--skinType4) 100%
  );
}

.skinTint input {
  background: linear-gradient(
    90deg,
    var(--skinTint1),
    var(--skinTint2) 50%,
    var(--skinTint3) 100%
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
  font-size: 18px;
}

#skinTint,
#parentSkinTint,
#skinType,
#parentSkinType {
  box-shadow: none;
}
#skinTint::-webkit-slider-thumb,
#parentSkinTint::-webkit-slider-thumb {
  background: var(--background1);
}
#skinTint::-moz-range-thumb,
#parentSkinTint::-moz-range-thumb {
  background: var(--background1);
}
#skinTint::-ms-thumb,
#parentSkinTint::-ms-thumb {
  background: var(--background1);
}

#skinType::-webkit-slider-thumb,
#parentSkinType::-webkit-slider-thumb {
  background: var(--background2);
}
#skinType::-moz-range-thumb,
#parentSkinType::-moz-range-thumb {
  background: var(--background2);
}
#skinType::-ms-thumb,
#parentSkinType::-ms-thumb {
  background: var(--background2);
}
</style>
