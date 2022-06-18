<template>
  <div class="container overflow-x-hidden">
    <section
      id="0"
      class="min-h-screen flex flex-col items-center justify-center px-8"
    >
      <div>
        <i18n
          tag="h1"
          path="landing.h1_title"
          class="font-bold text-8xl mb-10 whitespace-pre-line"
        >
          <template v-slot:pink>
            <span class="text-pink">
              {{ $t('landing.h1_title_pink') }}
            </span>
          </template>
        </i18n>
        <div class="w-full flex justify-between">
          <div class="block flex flex-col justify-between items-start">
            <span class="font-light text-2xl">{{
              $t('landing.subtitle')
            }}</span>
            <nuxt-link
              :to="localePath('customization')"
              class="font-bold text-3xl px-8 py-4 rounded-full neue"
              >{{ $t('landing.create_child') }}</nuxt-link
            >
          </div>
          <div
            class="
              h-48
              w-48
              flex
              justify-center
              items-center
              rounded-full
              overflow-hidden
              limited
              neue
            "
          >
            <span class="block">{{ $t('landing.limited') }}</span>
          </div>
        </div>
      </div>
    </section>
    <section
      id="1"
      class="min-h-screen flex flex-col items-center justify-center px-8"
    >
      <h2 class="text-7xl font-bold uppercase">
        {{ $t('landing.realisations') }}
      </h2>
      <div class="flex gap-4 justify-center m-24">
        <div class="w-[19%] flex flex-col items-center">
          <span class="name px-4 py-2 uppercase">{{
            $t('landing.name_1')
          }}</span>
          <video muted loop autoplay class="rounded-sm">
            <source src="@/assets/images/webm/bebe1.webm" type="video/webm" />
          </video>
        </div>
        <div class="w-[19%] flex flex-col items-center">
          <span class="name px-4 py-2 uppercase">{{
            $t('landing.name_2')
          }}</span>
          <video muted loop autoplay class="rounded-sm">
            <source src="@/assets/images/webm/bebe2.webm" type="video/webm" />
          </video>
        </div>
        <div class="w-[19%] flex flex-col items-center">
          <span class="name px-4 py-2 uppercase">{{
            $t('landing.name_3')
          }}</span>
          <video muted loop autoplay class="rounded-sm">
            <source src="@/assets/images/webm/bebe3.webm" type="video/webm" />
          </video>
        </div>
        <div class="w-[19%] flex flex-col items-center">
          <span class="name px-4 py-2 uppercase">{{
            $t('landing.name_4')
          }}</span>
          <video muted loop autoplay class="rounded-sm">
            <source src="@/assets/images/webm/bebe4.webm" type="video/webm" />
          </video>
        </div>
        <div class="w-[19%] flex flex-col items-center relative">
          <span class="name px-4 py-2 uppercase">{{
            $t('landing.name_5')
          }}</span>
          <video muted loop autoplay class="rounded-sm">
            <source src="@/assets/images/webm/bebe5.webm" type="video/webm" />
          </video>
          <img
            src="@/assets/images/flames.png"
            ref="flames"
            alt=""
            class="
              absolute
              left-[65%]
              top-[65%]
              h-2/3
            "
            style="transform-origin:center center"
          />
        </div>
      </div>
      <nuxt-link
        :to="localePath('customization')"
        class="font-bold text-3xl px-8 py-4 rounded-full neue"
        >{{ $t('landing.wants_mine') }}</nuxt-link
      >
    </section>
    <section
      id="2"
      class="min-h-screen flex flex-col items-center justify-center px-8"
    >
      <h2 class="text-7xl font-bold uppercase">{{ $t('landing.values') }}</h2>
      <div class="flex flex-wrap gap-8 justify-between m-24">
        <div class="w-[47%] flex rounded-lg border py-4 pr-8">
          <img
            src="@/assets/images/sticker_ecologie.png"
            alt=""
            class=" pink-neue"
            ref="ecologie"
          />
          <div class="flex flex-col justify-center">
            <h3 class="font-bold text-3xl uppercase mb-4">
              {{ $t('landing.eco_title') }}
            </h3>
            <p class="text-xl font-light">
              {{ $t('landing.eco_description') }} <br />
              <span class="uppercase">{{ $t('landing.eco_tldr') }}</span>
            </p>
          </div>
        </div>
        <div class="w-[47%] flex rounded-lg border py-4 pr-8">
          <img
            src="@/assets/images/sticker_positivite.png"
            alt=""
            class="pink-neue"
            ref="positive"

          />
          <div class="flex flex-col justify-center">
            <h3 class="font-bold text-3xl uppercase mb-4">
              {{ $t('landing.positivity_title') }}
            </h3>
            <p class="text-xl font-light">
              {{ $t('landing.positivity_description') }} <br />
              <span class="uppercase">{{ $t('landing.positivity_tldr') }}</span>
            </p>
          </div>
        </div>
        <div class="w-[47%] flex rounded-lg border py-4 pr-8">
          <img
            src="@/assets/images/sticker_egalite.png"
            alt=""
            class="pink-neue"
            ref="egalite"

          />
          <div class="flex flex-col justify-center">
            <h3 class="font-bold text-3xl uppercase mb-4">
              {{ $t('landing.egality_title') }}
            </h3>
            <p class="text-xl font-light">
              {{ $t('landing.egality_description') }} <br />
              <span class="uppercase">{{ $t('landing.egality_tldr') }}</span>
            </p>
          </div>
        </div>
        <div class="w-[47%] flex rounded-lg border py-4 pr-8">
          <img
            src="@/assets/images/sticker_innovation.png"
            alt=""
            class="pink-neue"
            ref="innovation"

          />
          <div class="flex flex-col justify-center">
            <h3 class="font-bold text-3xl uppercase mb-4">
              {{ $t('landing.innovation_title') }}
            </h3>
            <p class="text-xl font-light">
              {{ $t('landing.innovation_description') }} <br />
              <span class="uppercase">{{ $t('landing.innovation_tldr') }}</span>
            </p>
          </div>
        </div>
      </div>
      <nuxt-link
        :to="localePath('customization')"
        class="font-bold text-3xl px-8 py-4 rounded-full neue"
        >{{ $t('landing.more') }}</nuxt-link
      >
    </section>
    <section
      id="3"
      class="min-h-screen flex flex-col items-center justify-center px-8"
    >
      <h2 class="text-7xl font-bold uppercase">{{ $t('landing.solution') }}</h2>
      <div class="w-10/12 flex m-24 relative">
        <div class="w-11/12 flex gap-12 rounded-lg border" ref="border">
          <div class="pl-20 py-16">
            <h3 class="font-bold text-3xl uppercase mb-6">
              {{ $t('landing.give_title') }}
            </h3>
            <ul class="text-xl font-light bad">
              <li>{{ $t('landing.give_1') }}</li>
              <li>{{ $t('landing.give_2') }}</li>
              <li>{{ $t('landing.give_3') }}</li>
              <li>{{ $t('landing.give_4') }}</li>
              <li>{{ $t('landing.give_5') }}</li>
              <li>{{ $t('landing.give_6') }}</li>
            </ul>
          </div>
          <div class="py-16">
            <h3 class="font-bold text-3xl uppercase mb-6">
              {{ $t('landing.adopt_title') }}
            </h3>
            <ul class="text-xl font-light bad">
              <li>{{ $t('landing.adopt_1') }}</li>
              <li>{{ $t('landing.adopt_2') }}</li>
              <li>{{ $t('landing.adopt_3') }}</li>
              <li>{{ $t('landing.adopt_4') }}</li>
            </ul>
          </div>
          <div
            class="
              w-6/12
              h-full
              flex
              rounded-lg
              absolute
              right-0
              top-1/4
              bg-white
              neue
            "
          >
            <div class="pl-20 py-16">
              <h3 class="font-bold text-3xl uppercase mb-6">
                "{{ $t('landing.childexpresser_title') }}"
              </h3>
              <ul class="text-xl font-light good">
                <li>{{ $t('landing.childexpresser_1') }}</li>
                <li>{{ $t('landing.childexpresser_2') }}</li>
                <li>{{ $t('landing.childexpresser_3') }}</li>
                <li>{{ $t('landing.childexpresser_4') }}</li>
                <li>{{ $t('landing.childexpresser_5') }}</li>
                <li>{{ $t('landing.childexpresser_6') }}</li>
              </ul>
            </div>
            <img
              src="@/assets/images/ADN.svg"
              alt="ADN illustration"
              class="pb-16 absolute bottom-[-10%] right-[10%]"
            />
          </div>
        </div>
      </div>
    </section>
    <section
      id="4"
      class="min-h-screen flex flex-col items-center justify-center px-8"
    >
      <h2 class="text-7xl font-bold uppercase">{{ $t('landing.offer') }}</h2>
      <div class="w-10/12 flex gap-4 justify-between items-start m-24">
        <div class="rounded-md flex flex-col items-center w-full neue">
          <img
            src="@/assets/images/donutPremium.svg"
            alt=""
            class="w-1/2 -translate-y-1/3"
          />
          <h3 class="text-3xl font-light text-center mb-12 whitespace-pre-line">
            {{ $t('landing.premium') }}
          </h3>
          <span class="text-5xl mb-16 text-center">$$$<br />$$</span>
          <nuxt-link
            :to="localePath('customization')"
            class="
              font-bold
              text-3xl
              px-8
              py-4
              rounded-full
              neue
              translate-y-1/2
              bgo
            "
            >{{ $t('landing.discover') }}</nuxt-link
          >
        </div>
        <div class="rounded-md border flex flex-col items-center w-full" ref="offerBorder1">
          <img
            src="@/assets/images/donutStandard.svg"
            alt=""
            class="w-1/2 -translate-y-1/3"
          />
          <h3 class="text-3xl font-light text-center mb-12 whitespace-pre-line">
            {{ $t('landing.standard') }}
          </h3>
          <span class="text-5xl mb-16 stroke-text">$$$</span>
        </div>
        <div class="rounded-md border flex flex-col items-center w-full" ref="offerBorder2">
          <img
            src="@/assets/images/donutReconditionne.svg"
            alt=""
            class="w-1/2 -translate-y-1/3"
          />
          <h3 class="text-3xl font-light text-center mb-12 whitespace-pre-line">
            {{ $t('landing.recond') }}
          </h3>
          <span class="text-5xl mb-16 stroke-text">$$</span>
        </div>
        <div class="rounded-md border flex flex-col items-center w-full" ref="offerBorder3">
          <img
            src="@/assets/images/donutOccasion.svg"
            alt=""
            class="w-1/2 -translate-y-1/3"
          />
          <h3 class="text-3xl font-light text-center mb-12 whitespace-pre-line">
            {{ $t('landing.occas') }}
          </h3>
          <span class="text-5xl mb-16 stroke-text">$</span>
        </div>
        <div class="rounded-md border flex flex-col items-center w-full" ref="offerBorder4">
          <img
            src="@/assets/images/donutFree.svg"
            alt=""
            class="w-1/2 -translate-y-1/3"
          />
          <h3 class="text-3xl font-light text-center mb-12 whitespace-pre-line">
            {{ $t('landing.unsell') }}
          </h3>
          <span class="text-5xl mb-16 stroke-text">FREE</span>
        </div>
      </div>
    </section>
    <section
      id="5"
      class="min-h-screen flex flex-col items-center justify-center px-8"
    >
      <h2 class="text-7xl font-bold uppercase">{{ $t('landing.community') }}</h2>
      <div class="w-10/12 flex gap-4 justify-between items-start m-24">
        <div class="relative w-[350px]">
        <h2 class="text-7xl font-bold uppercase">{{ $t('landing.satisfaction_percent') }}</h2>
        <h3 class="text-3xl font-bold text-left mb-12 whitespace-pre-line max-w-[300px]">{{ $t('landing.satisfaction_text') }}</h3>
          <img
            src="@/assets/images/solarsystem.svg"
            alt=""
            class="top-0 absolute"
            style="transform: translate(-20%, -20%);"
          />
          <img
            src="@/assets/images/stickers_love.png"
            alt=""
            class="w-1/2 -translate-y-1/3 absolute translate-x-2/3"
          />
        </div>

        <div class="relative w-[900px]">
            <ul class="text-xl font-light clientList" ref="clientList">
              <li class="client">
                <img
                  src="@/assets/images/client1.png"
                  alt=""
                  class="w-[100px] h-[100px] mr-[20px]"
                />
                <article>
                  <div class="flex justify-between">
                    <div class="text">
                      <h3 class="font-bold text-2xl uppercase">{{ $t('landing.comu_1_name') }}</h3>
                      <h4 class="font-bold">{{ $t('landing.comu_premium') }}</h4>
                      <p style="font-size: 14px">{{ $t('landing.comu_1_ago') }}</p>
                    </div>
                    <div>
                    <img
                      src="@/assets/images/etoiles.png"
                      alt=""
                      class=""
                    />
                    </div>
                  </div>
                  <p>{{ $t('landing.comu_1_comment') }}</p>
                </article>
              </li>
              <li class="client">
                <img
                  src="@/assets/images/client1.png"
                  alt=""
                  class="w-[100px] h-[100px] mr-[20px]"
                />
                <article>
                  <div class="flex justify-between">
                    <div class="text">
                      <h3 class="font-bold text-2xl uppercase">{{ $t('landing.comu_2_name') }}</h3>
                      <h4 class="font-bold">{{ $t('landing.comu_premium') }}</h4>
                      <p style="font-size: 14px">{{ $t('landing.comu_2_ago') }}</p>
                    </div>
                    <div>
                    <img
                      src="@/assets/images/etoiles.png"
                      alt=""
                      class=""
                    />
                    </div>
                  </div>
                  <p>{{ $t('landing.comu_2_comment') }}</p>
                </article>
              </li>
              <li class="client">
                <img
                  src="@/assets/images/client1.png"
                  alt=""
                  class="w-[100px] h-[100px] mr-[20px]"
                />
                <article>
                  <div class="flex justify-between">
                    <div class="text">
                      <h3 class="font-bold text-2xl uppercase">{{ $t('landing.comu_3_name') }}</h3>
                      <h4 class="font-bold">{{ $t('landing.comu_premium') }}</h4>
                      <p style="font-size: 14px">{{ $t('landing.comu_3_ago') }}</p>
                    </div>
                    <div>
                    <img
                      src="@/assets/images/etoiles.png"
                      alt=""
                      class=""
                    />
                    </div>
                  </div>
                  <p>{{ $t('landing.comu_3_comment') }}</p>
                </article>
              </li>
            </ul>
        </div>
      </div>
      <nuxt-link
        :to="localePath('customization')"
        class="font-bold text-3xl px-8 py-4 rounded-full neue mt-[100px]"
        >{{ $t('landing.jump') }}</nuxt-link
      >
    </section>
  </div>
</template>

<script>
import Background from '~/components/Background.vue'
import gsap, { Power3 } from 'gsap'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default {
  components: { Background },
  name: 'Landing',
  layout: 'landing',
  nuxtI18n: {
    paths: {
      en: '/',
      fr: '/',
    },
  },
  mounted() {
  if (process.client) {
    gsap.registerPlugin(ScrollTrigger);
  }
  setInterval(() => this.moveCarousel(), 10000);
    this.animations()
  },
  methods: {
    //this.moveCarousel()   

    moveCarousel(){
          //const clients = this.$el.querySelectorAll('.client')


    if(this.clientList) {
      //clientList.querySelector('.client').remove()
      this.firstClient.classList.remove('animate-fade-up-in3')
      this.secondClient.classList.remove('animate-fade-up-in2')
      this.thirdClient.classList.remove('animate-fade-up-in')
    }

    this.clientList = this.$refs.clientList
    console.log(this.clientList)
    this.clients = this.clientList.querySelectorAll('.client')
    this.firstClient = this.clients[0]

    this.secondClient = this.clients[1]
    this.thirdClient = this.clients[2]

    this.copy = this.clients[0].cloneNode(true)

    if(this.clientList) {
      //clientList.querySelector('.client').remove()
      this.firstClient.classList.remove('animate-fade-up-in3')
      this.secondClient.classList.remove('animate-fade-up-in2')
      this.thirdClient.classList.remove('animate-fade-up-in')
    }

    if(this.clientList) {

      this.firstClient.classList.add('animate-fade-up-out')
      this.secondClient.classList.add('animate-fade-up-in3')
      this.thirdClient.classList.add('animate-fade-up-in2')
      setTimeout(() => {
        this.firstClient.remove()
      }, 500)
        this.copy.classList.add('animate-fade-up-in')
        this.clientList.appendChild(this.copy)

      // copy.classList.add('animate-fade-up-in')
      //this.clientList.appendChild(this.copy)

    }
    },
  animations() {
    gsap.fromTo(this.$refs.flames, { transform: 'rotate3d(0, 0, 1, -20deg)',},{
      transform: 'rotate3d(0, 0, 1, 20deg)',
      duration: 2,
      repeat: -1,
      ease: 'none',
      yoyo: true
    })
    gsap.fromTo(this.$refs.ecologie, { transform: 'translateX(-25%) rotate3d(0, 0, 1, -20deg)'},{
      transform: 'translateX(-25%) rotate3d(0, 0, 1, 20deg)',
      duration: 2,
      repeat: -1,
      ease: 'none',
      stagger: 0.1,
      yoyo: true
    })

    gsap.fromTo(this.$refs.positive, { transform: 'translate3d(-25%, -25%, 0) '},{
      transform: 'translate3d(-25%, 25%, 0)',
      duration: 2,
      repeat: -1,
      ease: Power3.easeIn,
      stagger: 0.3,
      yoyo: true
    })
    gsap.fromTo(this.$refs.innovation, { transform: 'translate3d(-25%, -10%, 0) '},{
      transform: 'translate3d(-25%, 10%, 0)',
      duration: 1,
      repeat: -1,
      ease: Power3.easeIn,
      delay: 0.5,
      yoyo: true
    })

    gsap.fromTo(this.$refs.egalite, { transform: 'translateX(-25%) scale3d(0.9, 0.9, 0.9)'},{
      transform: 'translateX(-25%) scale3d(1.5, 1.5, 1.5)',
      duration: 2,
      repeat: -1,
      ease: 'none',
      stagger: 0.1,
      yoyo: true
    })
  }
  },
}
</script>

<style scoped>
h1 span {
  display: inline-block;
  transform: rotate(-2.6deg);
}

.name {
  display: inline-block;
  transform: rotate(-4.6deg) translateY(30%);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #1d1d1b;
  backdrop-filter: blur(29px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 11px;
}

.neue {
  box-shadow: -3px -5px 17px rgba(255, 255, 255, 0.87),
    9px 25.03px 30px rgba(110, 163, 242, 0.38);
  backdrop-filter: blur(40px);
}

a.neue:not(.bgo),
button.neue:not(.bgo) {
  background: rgba(229, 230, 230, 0.31);
}
.bgo {
  background: rgba(229, 230, 230, 1);
}

.pink-neue {
  filter: drop-shadow(-3.26669px -5.44448px 18.5112px rgba(255, 255, 255, 0.87))
    drop-shadow(9.80006px 27.2551px 32.6669px rgba(232, 147, 173, 0.47));
}

.limited {
  box-shadow: inset 0px 11.638px 25.55px rgba(255, 255, 255, 0.73),
    inset -5.81898px -4.65518px 17.49px rgba(255, 255, 255, 0.71),
    -3px -5px 17px rgba(255, 255, 255, 0.87),
    9px 25.03px 30px rgba(110, 163, 242, 0.38);
  backdrop-filter: blur(40px);
  background: rgba(190, 206, 225, 0.45);
}

.client {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 60px;
  padding: 35px 90px;
  display: flex;
  flex-direction: row;
  transition: all ease 0.5s;
  width: 800px;
  filter: drop-shadow(-3px -5px 17px rgba(255, 255, 255, 0.9)) drop-shadow(9px 25px 30px rgba(110, 143, 242, 0.4))
}

.clientList {
  width: 850px;
}

.clientList .client:nth-child(1) {
  z-index: 3;
  left: 0;
  top: 0;
}

.clientList .client:nth-child(2) {
  z-index: 2;
  left: 25px;
  top: 25px;
}

.clientList .client:nth-child(3) {
  z-index: 1;
  left: 50px;
  top: 50px;
}

/*
.clientList .client:nth-child(2) {
  left: -25px;
  top: -25px;
}

.clientList .client:nth-child(3) {
  left: -50px;
  top: -50px;
}
*/
ul li:not(:last-child) {
  margin-bottom: 8px;
}
ul.bad li::before {
  content: url(@/assets/images/cross.png);
  margin-right: 16px;
}
ul.good li::before {
  content: url(@/assets/images/tick.png);
  margin-right: 16px;
}

.stroke-text {
  text-shadow: 1px 1px 0 #000, -1px -1px 0 #000, -1px 1px 0 #000,
    1px -1px 0 #000;
  color: white;
}

.border {
  border-color: #000;
}

section {
  scroll-margin-top: 4rem;
}
</style>
