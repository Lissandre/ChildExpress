<template>
  <div class="flex flex-col relative h-full w-full" ref="content">
    <form @submit.prevent="prevent" class="h-full w-full form5" ref="form5">
      <div class="payment-wrapper z-[2]">
        <div class="payment-category-wrapper relative">
          <h3 class="payment-category roc">Récapitulatif de commande</h3>
          <div class="payment-resume">
            <div class="payment-infos">
              <h4 class="payment-subtitle neueBit">Détail</h4>
              <ul class="list-disc ml-5">
                <li>customisation physique</li>
                <li>customisation personnalité</li>
                <li>option supplémentaire</li>
              </ul>
              <h4 class="payment-subtitle neueBit">
                Qté: 1 &nbsp; &nbsp; &nbsp;Prix: $$$$
              </h4>
            </div>
            <div class="payment-premium"></div>
          </div>
        </div>
        <div class="payment-category-wrapper relative">
          <h3 class="payment-category">Mode de livraison</h3>

          <fieldset class="shipping-wrapper">
            <ul class="shipping-list">
              <li class="shipping-item">
                <input type="radio" id="free" name="ship" />
                <label for="free">
                  <span class="label1 neueBit">Gratuit</span>
                  <span class="label2 roc"
                    >Livraison standard et aléatoire</span
                  >
                  <span class="label3 roc">(peut varier entre 2 et 3 ans)</span>
                </label>
              </li>
              <li class="shipping-item">
                <input type="radio" id="cheap" name="ship" />
                <label for="cheap">
                  <span class="label1 neueBit">$$</span>
                  <span class="label2 roc">Livraison en 24h</span>
                  <span class="label3 roc">(Entre 6h04 et 18h21)</span>
                </label>
              </li>
              <li class="shipping-item">
                <input type="radio" id="expensive" name="ship" />
                <label for="expensive">
                  <span class="label1 neueBit">$$$$</span>
                  <span class="label2 roc"
                    >Livraison instantanée (cigogne supersonique)</span
                  >
                  <span class="label3 roc">(En quelques secondes chrono)</span>
                </label>
              </li>
            </ul>
          </fieldset>
        </div>
        <div class="payment-category-wrapper relative">
          <h3 class="payment-category">Mail de facturation</h3>
          <input type="email" placeholder="badparent@gmail.com" />
          <div class="underline"></div>
          <div class="fake-underline"></div>
        </div>
      </div>
      <component
        v-for="input in inputs"
        :key="input.name"
        :is="input.component"
        :input="input"
        v-if="input.name != 'email'"
        ref="inputs"
        v-on:updateInput="
          (type, name, value, optional) =>
            inputChange(type, name, value, optional)
        "
        :locale="
          $t(
            `form5.${slugify(`${input.type}_${input.name}`, {
              replacement: '_',
              lower: true,
            })}`
          )
        "
      ></component>
    </form>
  </div>
</template>

<script>
import { useStore } from '@/stores/'
import form5 from '@/data/forms/form5.json'
import slugify from 'slugify'

export default {
  name: 'Form5',
  data() {
    return {
      name: 'form5',
      inputs: [],
      slugify: slugify,
    }
  },
  setup() {
    const store = useStore()
    return { store }
  },
  mounted() {
    this.inputs = form5.inputs

    const payment = document.querySelector('.payment-wrapper')
    payment.classList.add('animate-fromrightpayement')

    setTimeout(() => {
      const submitFinal = document.querySelector('.submitFinal')
      submitFinal.classList.add('animate-opacityfadein')
    }, 3000)
  },
  methods: {
    prevent(e) {
      e.preventDefault()
      this.redirectToEnd()
    },
    inputChange(type, name, value, optional) {},
    redirectToEnd() {
      this.$refs.content.classList.add('fadeToBlack')
      this.$refs.form5.classList.add('animate-opacityfadeout')
      setTimeout(() => {
        if (this.$i18n.locale === 'fr') this.$router.push('/fr/mince')
        else this.$router.push('/en/oops')
      }, 3000)
    },
  },
}
</script>

<style>
.payment-wrapper {
  padding: 10px 50px;
  border: 1px solid white;
  width: fit-content;
  height: fit-content;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  border-radius: 40px;
  color: white;
  display: inline-block;
  animation-delay: 2000ms;
  right: 100%;
  max-width: 45%;
}
.payment-category-wrapper {
  padding-bottom: 40px;
}

.payment-category-wrapper:nth-child(1):after,
.payment-category-wrapper:nth-child(2):after {
  content: '';
  height: 1px;
  background: white;
  width: 100%;
  bottom: 0;
  position: absolute;
}
.payment-category {
  font-size: 32px;
  font-weight: 600;
  font-family: 'roc-grotesk-wide';
  text-transform: uppercase;
}
.payment-category:nth-child(1) {
  margin-top: 30px;
}

.payment-resume {
  display: flex;
  justify-content: space-between;
}

.payment-premium {
  background: no-repeat center center url('@/assets/images/premium.svg');
  color: white;
  stroke: white;
  height: 174px;
  width: 240px;
}

.payment-subtitle {
  font-size: 26px;
  margin-top: 10px;
}

.shipping-wrapper {
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
}

.shipping-item,
.shipping-list {
  display: flex;
}

.shipping-item {
  flex: 1 1 0px;
  z-index: 1;
  pointer-events: all;
  flex-direction: column;
}

.label1 {
  font-size: 28px;
  cursor: pointer;
}
.label2 {
  font-size: 15px;
  font-weight: 100;
  cursor: pointer;
}
.label3 {
  font-size: 11px;
  font-weight: 100;
  color: #bbb;
  cursor: pointer;
}

.submitFinal {
  width: 20rem;
  position: relative;
  bottom: 0;
  animation-delay: 4000ms;
  opacity: 0;
}

@media screen and (max-width: 1500px) {
  .payment-wrapper {
    max-width: 600px;
  }
}
</style>

<style scoped>
fieldset {
  box-shadow: none;
  position: relative;
}

input[type='radio'] {
  appearance: none;
  background-color: transparent;
  font: inherit;
  border: 1px solid white;
  border-radius: 50%;
  position: relative;
  width: 30px;
  height: 30px;
  margin-right: 20px;
  cursor: pointer;
}
input[type='radio']::before {
  content: '';
  border-radius: 50%;
  transition: 120ms transform ease-in-out;
  background-color: #0f54e4;
  position: absolute;
  transform: translate3d(-50%, -50%, 0) scale(0);
  left: 50%;
  top: 50%;
  width: 15px;
  height: 15px;
  box-shadow: 1px 5px 5px rgb(15 84 228 / 56%);
}
input[type='radio']:checked::before,
input[type='radio']:hover::before {
  transform: translate3d(-50%, -50%, 0) scale(1);
}

label {
  display: flex;
  flex-direction: column;
  max-width: 80%;
}

.underline {
  transition: all 0.5s;
  display: inline-block;
  bottom: 40px;
  left: 0%;
  position: absolute;
  width: 0%;
  height: 2px;
  background-color: white;
}
.underline {
  z-index: 100;
}

.fake-underline {
  transition: all 0.5s;
  display: inline-block;
  bottom: 40px;
  left: 0%;
  position: absolute;
  height: 2px;
  width: 50%;
  background-color: rgba(255, 255, 255, 0.521);
}
input[type='email'] {
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  display: inline-block;
  overflow: hidden;
  background: none;
  outline: none !important;
  font-size: 24px;
  width: 100%;
}

input[type='email']:focus + .underline {
  width: 50%;
}
/*
.submit-wrapper {
    left: 40%;
    bottom: -65%;
}

*/
</style>
