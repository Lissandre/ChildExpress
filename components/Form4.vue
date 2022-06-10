<template>
  <div class="flex flex-col relative h-full w-full">
    <div class="babyInfos">
      <p class="info_category neueBit">Welcome</p>
      <p class="info_data info-name roc">{{ getText }}</p>
      <p class="info_category neueBit">QI</p>
      <p class="info_data roc">
        {{ getRoundSlider }} <span class="line1"></span>
      </p>

      <p class="info_category neueBit">Taille</p>
      <p class="info_data roc">{{ getRange }} CM <span class="line2"></span></p>

      <p class="info_category neueBit">Poids</p>
      <p class="info_data roc">{{ getCounter }} KG</p>
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
        <span> Avocat </span> d'intelligence artificielle
      </p>
      <div class="tag-xtra-wrapper roc">
        <p class="tag-xtra">Volant</p>
        <p class="tag-xtra">Muet</p>
        <p class="tag-xtra">Silencieux</p>
        <p class="tag-xtra">Visionnaire</p>
      </div>
    </div>

    <div class="ticket">
      <div class="ticket__left">
        <div class="ticket__left__bottom">
          <span>Analyse</span>
        </div>
      </div>
      <div class="ticket__center">
        <span class="ticket__center__title">Personnalité</span>
        <div class="ticket__center__item">
          <span class="ticket__center__rectangle"></span>
          <span class="ticket__center__fill"></span>
          <span class="ticket__center__percentage">50%</span>
          <p class="ticket__center__name neueBit">Logique</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/stores/'
import { form4 } from '@/data/forms.json'
import slugify from 'slugify'

export default {
  name: 'Form4',
  data() {
    return {
      name: 'form4',
      inputs: [],
      slugify: slugify,
    }
  },
  setup() {
    const store = useStore()
    return { store }
  },
  mounted() {
    this.inputs = form4.inputs

    setTimeout(() => {
      const lines = document.querySelectorAll('.line1, .line2')
      lines.forEach((line) => {
        line.classList.add('animate-linegrow')
      })
    }, 20000)
    this.soundEvents()
  },
  methods: {
    prevent(e) {
      e.preventDefault()
    },

    soundEvents() {
      requestAnimationFrame(() => {
        if ($nuxt)
          $nuxt.$emit('updateSound', 'form4', 'speech', 'intro', 'speech1')
      })
    },
    inputChange(type, name, value, optional) {},
  },
  computed: {
    getText: function () {
      return this.store.getText('babyName')
    },
    getCounter: function () {
      return this.store.getCounter('overallSize')
    },
    getRange: function () {
      return this.store.getRange('scale')
    },
    getRoundSlider: function () {
      return this.store.getRoundSlider('IQ')
    },
    getJobs: function () {
      return this.store.getJobs
    },
  },
}
</script>

<style>
.babyInfos {
  width: 80%;
  margin: 0 auto;
  z-index: 1;
}

.info-name {
  color: rgba(0, 0, 0, 0.5) !important;
  /*font-size: 25.5vw !important; */
  font-size: 28px;
  text-align: center;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
  text-align: left;
}

.info_data {
  color: white;
  font-weight: 700;
  font-size: 42px;
  position: relative;
  margin-top: -15px;
}
.info_category {
  color: white;
  text-transform: uppercase;
  font-size: 28px;
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
  backdrop-filter: blur(21px);
  background: no-repeat center center url('@/assets/images/bin.svg');
}

.submit-bin {
  background-color: transparent !important;
  border: 1px solid white;
  box-shadow: none;
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
  left: 20%;
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
}

.line2 {
  animation-delay: 0.4s;
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

.ticket {
  display: flex;
  position: absolute;
  right: 0;
  top: 50%;
  align-items: center;
  z-index: 1;
  transform: translate3d(-50%, -50%, 0);
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

.ticket__center {
  display: flex;
  align-items: center;
}

.ticket__center__title {
  font-family: 'roc-grotesk-wide';
  font-weight: 900;
  font-size: 42px;
}

.ticket__center__rectangle {
  width: 150px;
  border: 1px solid black;
  height: 50px;
}

.ticket__center__name {
  font-size: 30px;
}

.border {
  border-left: 2px dashed white;
  height: 280px;
}
</style>
