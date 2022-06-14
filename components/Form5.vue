<template>
  <div class="flex flex-col relative h-full w-full z-[1]" ref="content">
    <form @submit.prevent="prevent" class="h-full w-full">
      <div class="payment-wrapper">
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
        </div>
      </div>
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
import { form5 } from '@/data/forms.json'
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
  },
  methods: {
    prevent(e) {
      e.preventDefault()
    },
    inputChange(type, name, value, optional) {},
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
  padding-left:0;
  padding-right:0;
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
}

@media screen and (max-width: 1500px) {
  .payment-wrapper {
    max-width: 600px;
  }
}
</style>

<style scoped>
fieldset {
  background: none;
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
input[type='radio']:checked::before {
  transform: translate3d(-50%, -50%, 0) scale(1);
}

label {
  display: flex;
  flex-direction: column;
  max-width: 80%;
}
/*
.submit-wrapper {
    left: 40%;
    bottom: -65%;
}

*/
</style>