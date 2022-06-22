<template>
  <div class="flex flex-col relative h-full w-full fadeWrapper" ref="content">
    <div class="fadeWrapper" ref="fade"></div>
    <div class="babyInfos">
      <div class="Title animate-revealtext">
        <span class="Title-mask"
          ><p class="info_category neueBit Title-line animate-revealtext first">
            Welcome
          </p></span
        >
        <span class="Title-mask"
          ><p
            class="info_data info-name outline Title-line animate-revealtext second"
          >
            {{ getText }}
          </p></span
        >
        <span class="Title-mask"
          ><p class="info_category neueBit Title-line animate-revealtext third">
            QI
          </p></span
        >
        <span class="Title-mask"
          ><p class="info_data roc Title-line animate-revealtext fourth">
            {{ getRoundSlider }} <span class="line1"></span></p
        ></span>

        <span class="Title-mask"
          ><p class="info_category neueBit Title-line animate-revealtext fifth">
            Taille
          </p></span
        >
        <span class="Title-mask"
          ><p class="info_data roc Title-line animate-revealtext six">
            {{ getRange }} CM <span class="line2"></span></p
        ></span>

        <span class="Title-mask"
          ><p class="info_category neueBit Title-line animate-revealtext seven">
            Poids
          </p></span
        >
        <span class="Title-mask"
          ><p class="info_data roc Title-line animate-revealtext eight">
            3 KG
          </p></span
        >
      </div>
    </div>
    <form @submit.prevent="prevent" class="h-full w-full">
      <component
        v-for="input in inputs"
        :key="input.name"
        :is="input.component"
        :input="input"
        ref="inputs"
        v-on:updateInput="
          (type, name, value, optional) =>
            inputChange(type, name, value, optional)
        "
        :locale="
          $t(
            `form4.${slugify(`${input.type}_${input.name}`, {
              replacement: '_',
              lower: true,
            })}`
          )
        "
      ></component>
    </form>

    <div class="tag-wrapper">
      <p class="tag_data tag-name roc">{{ getText }}</p>
      <p class="tag_data tag-job roc">
        <span>{{ getJob }}</span>
      </p>
      <div class="tag-xtra-wrapper roc">
        <p class="tag-xtra" v-for="(xtra, index) in splittedXtra" :key="index">
          {{ xtra }}
        </p>
      </div>
    </div>

    <div class="resumeWrapper blurWrapper" ref="blur"></div>

    <div class="ticket">
      <div class="ticket__left">
        <div class="ticket__left__bottom">
          <span>Analyse</span>
        </div>
      </div>
      <div class="ticket__center">
        <span class="ticket__center__title">Personnalité</span>
        <div
          class="ticket__center__item"
          v-for="(perso, index) in personality"
          :key="index"
        >
          <div class="ticket__center__item__left">
            <span class="ticket__center__rectangle"></span>
            <span class="ticket__center__fill" ref="fill"></span>
            <span class="ticket__center__percentage"
              >{{ getPercentage(perso.id, index) }}%</span
            >
          </div>
          <p class="ticket__center__name neueBit">
            {{ getLabel(perso.id) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/stores/'
import form4 from '@/data/forms/form4.json'
import form3 from '@/data/forms/form3.json'
import slugify from 'slugify'

export default {
  name: 'Form4',
  data() {
    return {
      name: 'form4',
      inputs: [],
      slugify: slugify,
      personality: [
        { id: 'courageousGreedy' },
        { id: 'creativeLogic' },
        { id: 'hyperactiveSensitive' },
        { id: 'eloquentHonest' },
      ],
      xtras: [
        { id: 'silent' },
        { id: 'independant' },
        { id: 'clean' },
        { id: 'visionary' },
      ],
      xtrasToPlay: [{id: 'silent', value: 'silent'}],
      splittedXtra: [],
    }
  },
  setup() {
    const store = useStore()
    return { store }
  },
  mounted() {
    this.inputs = form4.inputs

    /*
    if (this.$nuxt.$scene.assets.needsLoad) {
      this.$nuxt.$scene.assets.on('ressourcesReady', () => {
        this.$nuxt.$scene.init()
      })
    }
    */

    this.$refs.blur.classList.remove('blurWrapper')

    setTimeout(() => {
      this.getExtras()
    }, 2000)
    setTimeout(() => {
      const lines = document.querySelectorAll('.line1, .line2')
      lines.forEach((line) => {
        line.classList.add('animate-linegrow')
      })
    }, 7000)

    setTimeout(() => {
      const tag = document.querySelector('.tag-wrapper')
      tag.classList.add('animate-fromleft')
    }, 8000)
    setTimeout(() => {
      const ticket = document.querySelector('.ticket')
      ticket.classList.add('animate-fromright')
    }, 9000)
    this.soundEvents()
  },
  methods: {
    prevent(e) {
      e.preventDefault()
    },

    soundEvents() {
      requestAnimationFrame(() => {
        if ($nuxt) {
          $nuxt.$emit('updateSound', 'form4', 'speech', 'intro', 'speech1')
          this.$nuxt.$scene.world.baby.babyAppearForm4()
          const store = this.store
          setTimeout(() => {
            if (this.$scene) {
              this.$nuxt.$scene.world.setSpotLights()
              var boxPersonnality = []
              this.personality.forEach((perso, index) => {
                const label = this.getLabel(perso.id)
                const percentage = this.getPercentage(perso.id, index)
                boxPersonnality.push({ label, percentage })
              })
              store.changeBox(
                this.getJob,
                this.getText,
                this.getCurrentMoney,
                this.splittedXtra,
                boxPersonnality,
                this.getRoundSlider,
                this.getCounter,
                this.getRange
              )
            }
          }, 5000)
        }
        const keep = document.querySelector('.submit-child')
        const unkeep = document.querySelector('.submit-bin')

        keep.addEventListener('click', () => this.keepBaby())
        unkeep.addEventListener('click', () => this.unkeepBaby())
      })
    },
    getLabel(id) {
      for (const [key, value] of Object.entries(form3.inputs)) {
        if (key === id) {
          if (value.value > 0.5)
            return form3.inputs[key].locales[this.$i18n.locale].label2
          else return form3.inputs[key].locales[this.$i18n.locale].label1
        }
      }
    },

    getPercentage(id, index) {
      this.rectangleFill = this.$refs.fill
      if (this.rectangleFill) {
        const value = this.getRadios(id)

        this.finalValue = this.getFinalXtraValue(value)
        this.finalValue = this.finalValue + this.sign() * 0.15
        this.finalValue = Math.round(this.finalValue * 1e2) / 1e2

        this.rectangleFill[index].style.width = `${this.finalValue * 300}px`
        return this.finalValue * 100
      } else return 0
    },

    getExtras() {
      this.xtras.forEach((xtra) => {
        if (this.store.getXtras(xtra.id) === 1) {
          this.xtrasToPlay.push({
            id: xtra.id,
            value: this.store.getXtras(xtra.id),
          })
        }

        this.xtrasToPlay
      })

      this.xtrasToPlay.forEach((xtra) => this.getSplittedExtra(xtra.id))
    },

    getFinalXtraValue(value) {
      switch (value) {
        case '0':
        case '1':
          return 0.8
        case '0.2':
        case '0.8':
          return 0.6
        case '0.4':
        case '0.6':
          return 0.3
      }
    },
    sign() {
      return Math.round(Math.random()) * 2 - 1
    },
    getSplittedExtra(id) {
      if (this.$i18n.locale === 'fr')
        this.splittedXtra.push(
          form3.inputs[id].locales[this.$i18n.locale].label1.split('-')[1]
        )
      else if (this.$i18n.locale === 'en')
        this.splittedXtra.push(
          form3.inputs[id].locales[this.$i18n.locale].label1.split('-')[0]
        )
    },
    inputChange(type, name, value, optional) {},

    keepBaby() {
      $nuxt.$emit('updateSound', 'form4', 'submit', 'keep', 'true')
      setTimeout(() => {
        this.$refs.content.classList.add('animate-slideup')
        this.store.focusBox()

        // lancer ici la bonne anim de boite
      }, 6000)

      setTimeout(() => {
        $nuxt.$emit('updateSound', 'form4', 'text', 'box')
      }, 7500)
      setTimeout(() => {
        this.$helpers.updateInput('submit', 'keep', 'true')
      }, 17000)
    },
    unkeepBaby() {
      $nuxt.$emit('updateSound', 'form4', 'submit', 'unkeep', 'true1')
      setTimeout(() => {
        this.store.focusBin()
        $nuxt.$emit('updateSound', 'form4', 'text', 'bin')
      }, 11000)
      setTimeout(() => {
        this.$refs.content.classList.add('fadeToBlack')
        this.$refs.fade.classList.add('fadeToBlack')
      }, 14000)
      setTimeout(() => {
        this.redirectToEnd()
      }, 17000)
    },

    redirectToEnd() {
      if (this.$i18n.locale === 'fr') this.$router.push('/fr/mince')
      else this.$router.push('/en/oops')
    },
  },
  computed: {
    getText: function () {
      return this.store.getText('babyName')
    },
    getOverallSize() {
      return this.store.getOverallSize
    },
    getRange: function () {
      return this.store.getRange('scale')
    },
    getRoundSlider: function () {
      return this.store.getRoundSlider('headSize')
    },
    getJob: function () {
      return this.store.getJob
    },
    getRadios: function () {
      return (id) => this.store.getRadio(id)
    },
    getCurrentMoney: function () {
      return this.store.currentMoney
    },
  },
}
</script>

<style>
.babyInfos {
  /*width: 80vw;*/
  width: 90vw;
  margin: 0 auto;
  z-index: 1;
  height: 80%;
  transform: translate3d(-50%, -20%, 0);
  top: 20%;
  position: relative;
  left: 50%;
}

.resumeWrapper,
.fadeToBlack {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  transition: all ease 0.5s;
  transition-delay: 1500ms;
}

.fadeToBlack {
  z-index: 1000;
  visibility: hidden;
  opacity: 0;
}
.blurWrapper {
  visibility: visible;
  backdrop-filter: blur(10px) contrast(30%);
  z-index: 1000;
}

.fadeToBlack {
  visibility: visible;
  opacity: 1;
  background: black;
}

.info_data {
  color: white;
  font-weight: 700;
  font-size: 42px;
  position: relative;
  margin-top: -15px;
}

.info-name {
  /*font-size: 25.5vw !important; */
  font-size: 5rem;
  text-align: center;
  text-align: left;
  text-transform: uppercase;
  font-family: 'roc-grotesk-extrawide';
  font-weight: 700;
}

.info_category {
  color: white;
  text-transform: uppercase;
  font-size: 28px;
  opacity: 0;
  transform: translate(0%, 100%) matrix(1, 0, 0, 1, 0, 0);
  will-change: opacity, transform;
}

.submit-bin {
  background-color: transparent !important;
  border: 1px solid white;
  box-shadow: none;
}
.submit-bin:hover {
  color: white;
}

.tag-wrapper {
  background-image: url('@/assets/images/paper.png');
  width: fit-content;
  height: fit-content;
  z-index: 10;
  border-radius: 26px;
  padding: 30px;
  line-height: 30px;
  bottom: 20%;
  position: absolute;
  left: -30%;
  max-width: 400px;
}

.tag-name {
  font-size: 34px;
  font-family: 'roc-grotesk-wide';
  font-weight: 700;
  text-transform: uppercase;
}

.tag-job {
  font-family: 'roc-grotesk-condensed';
  font-size: 26px;
}

.tag-xtra-wrapper {
}

.tag-xtra {
  font-weight: 600;
  border: 1px solid black;
  border-radius: 6px;
  padding: 2px 2px 0 2px;
  width: fit-content;
  height: fit-content;
  display: inline-block;
  text-transform: uppercase;
  font-size: 22px;
  margin-top: 3px;
  margin-right: 3px;
  line-height: auto;
}

.line1,
.line2 {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: white;
  width: 0;
  animation-delay: 3.4s;
}

.line2 {
  animation-delay: 3.7s;
}
</style>

<style scoped>
html,
body {
  font-family: sans-serif;
  background-color: #000;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

svg {
  display: none;
}

.submit-wrapper:first-child {
  right: 300px;
}

.submit-wrapper:first-child::before {
  content: '';
  position: absolute;
  height: 63px;
  width: 45px;
  z-index: 10;
  left: -34px;
  backdrop-filter: blur(10px);
  background: no-repeat center center url('@/assets/images/bin.svg');
}

.ticket {
  display: flex;
  position: absolute;
  right: -800px;
  top: 50%;
  align-items: center;
  z-index: 1;
  transform: translate3d(0, -50%, 0);
  background: no-repeat center center url('@/assets/images/ticket.svg');
  height: 700px;
  width: 700px;
}

.ticket__left {
  margin-left: 63px;
  margin-top: 350px;
}

.ticket__left__bottom {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 130px;
  width: 50px;
  border-radius: 0 0 20px 0;
}

.ticket__left__bottom span {
  font-size: 32px;
  font-weight: bold;
  text-transform: uppercase;
  display: block;
  margin-bottom: 100%;
  transform: rotate(-90deg);
}

.ticket__center__item {
  display: flex;
  flex-direction: column;
}

.ticket__center__item__left {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.ticket__center {
  display: inline-block;
  padding: 0 30px;
  margin-top: -100px;
}

.ticket__center__title {
  font-family: 'roc-grotesk-wide';
  font-weight: 600;
  font-size: 42px;
  display: inline-block;
  text-transform: uppercase;
}

.ticket__center__rectangle {
  width: 300px;
  border: 1px solid black;
  height: 30px;
  display: inline-block;
}

.ticket__center__fill {
  width: 0;
  background: black;
  height: 30px;
  position: absolute;
  transition: all ease-in-out 2.5s;
  transition-delay: 5000ms;
}

.ticket__center__percentage {
  font-family: 'roc-grotesk-wide';
  font-weight: 900;
  font-size: 26px;
  transition-delay: 5000ms;
}

.ticket__center__name {
  font-size: 30px;
  display: inline-block;
}

.border {
  border-left: 2px dashed white;
  height: 280px;
}

/* Faux outline for older browsers */
.outline {
  color: white;
  /* Unfortunately you can't use transparent here … */
  text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white,
    1px 1px 0 white;
  font-size: 9rem;
  /* font-size: 25.5vw; */
}

.Title {
  font-size: 2rem;
  opacity: 0;
  transform: translate(0%, 50%) matrix(1, 0, 0, 1, 0, 0);
  will-change: opacity, transform;
  animation-delay: 400ms;
}

.Title-mask {
  display: block;
  position: relative;
  text-align: start;
  overflow: hidden;
}

.Title-line {
  display: inline-block;
  opacity: 0;
  transform: translate(0%, 50%) matrix(1, 0, 0, 1, 0, 0);
  will-change: opacity, transform;
}

.first {
  animation-delay: 3200ms;
}
.second {
  animation-delay: 3500ms;
}
.third {
  animation-delay: 3800ms;
}
.fourth {
  animation-delay: 4100ms;
}
.fifth {
  animation-delay: 4400ms;
}
.six {
  animation-delay: 4700ms;
}
.seven {
  animation-delay: 5000ms;
}
.eight {
  animation-delay: 5300ms;
}
.nine {
  animation-delay: 5600ms;
}

/* Real outline for modern browsers */
@supports ((text-stroke: 2px white) or (-webkit-text-stroke: 2px white)) {
  .outline {
    color: transparent;
    -webkit-text-stroke: 2px white;
    text-stroke: 2px white;
    text-shadow: none;
  }
}
</style>
