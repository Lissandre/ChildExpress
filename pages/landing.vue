<template>
  <div class="container overflow-x-hidden text-black roc relative land">
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
            <span class="text-pink relative">
              <div class="typed-out">{{ $t('landing.h1_title_pink') }}</div>
              <div class="typed-wrapper">{{ $t('landing.h1_title_pink') }}</div>
              <div class="typed-write"></div>
              <svg
                ref="rectangle"
                class="absolute"
                width="623"
                height="180"
                viewBox="0 0 603 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  class="pinkRectangle"
                  x="9.18359"
                  y="30.4434"
                  width="584"
                  height="100"
                  stroke="#E893AD"
                  stroke-width="2"
                />
                <rect
                  class="whiteRectangle"
                  x="7.16992"
                  y="28.7646"
                  width="6"
                  height="6"
                  fill="white"
                  stroke="#E893AD"
                  stroke-width="2"
                />
                <rect
                  class="whiteRectangle"
                  x="595.564"
                  y="27.1797"
                  width="6"
                  height="6"
                  fill="white"
                  stroke="#E893AD"
                  stroke-width="2"
                />
                <rect
                  class="whiteRectangle"
                  x="6.80469"
                  y="127.659"
                  width="6"
                  height="6"
                  fill="white"
                  stroke="#E893AD"
                  stroke-width="2"
                />
                <rect
                  class="whiteRectangle"
                  x="595.199"
                  y="126.074"
                  width="6"
                  height="6"
                  fill="white"
                  stroke="#E893AD"
                  stroke-width="2"
                />
              </svg>
            </span>
          </template>
        </i18n>
        <div class="w-full flex justify-between">
          <div class="block flex flex-col justify-between items-start">
            <span class="font-light text-2xl">{{
              $t('landing.subtitle')
            }}</span>
            <button
              @click="redirect"
              class="font-bold text-3xl px-8 py-4 rounded-full neue neueBit"
            >
              {{ $t('landing.create_child') }}
            </button>
          </div>
          <div
            class="h-48 w-48 flex justify-center items-center rounded-full overflow-hidden limited neue"
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
      <div class="Title">
        <span class="Title-mask">
          <h2 class="text-7xl font-bold uppercase Title-line">
            {{ $t('landing.realisations') }}
          </h2>
        </span>
      </div>

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
            src="@/assets/images/landing_debut/flames.png"
            ref="flames"
            alt=""
            class="absolute left-[65%] top-[65%] h-2/3"
          />
        </div>
      </div>
      <button
        @click="redirect"
        class="font-bold text-3xl px-8 py-4 rounded-full neue neueBit"
      >
        {{ $t('landing.wants_mine') }}
      </button>
    </section>
    <section
      id="2"
      class="min-h-screen flex flex-col items-center justify-center px-8"
    >
      <div class="Title">
        <span class="Title-mask">
          <h2 class="text-7xl font-bold uppercase Title-line">
            {{ $t('landing.values') }}
          </h2>
        </span>
      </div>
      <div class="flex flex-wrap gap-8 justify-between m-24">
        <div class="w-[47%] flex relative py-4 pr-8">
          <svg
            class="absolute top-0 draw-svg"
            viewBox="0 0 100% 100%"
            fill="none"
            stroke="black"
            width="100%"
            height="100%"
          >
            <rect x="0" y="5" width="100%" height="95%" rx="60" href="rect" />
          </svg>
          <img
            src="@/assets/images/landing_debut/sticker_ecologie.png"
            alt=""
            class="pink-neue"
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
        <div class="w-[47%] flex relative py-4 pr-8">
          <svg
            class="absolute top-0 draw-svg"
            viewBox="0 0 100% 100%"
            fill="none"
            stroke="black"
            width="100%"
            height="100%"
          >
            <rect x="0" y="5" width="100%" height="95%" rx="60" href="rect" />
          </svg>
          <img
            src="@/assets/images/landing_debut/sticker_positivite.png"
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
        <div class="w-[47%] flex relative py-4 pr-8">
          <svg
            class="absolute top-0 draw-svg"
            viewBox="0 0 100% 100%"
            fill="none"
            stroke="black"
            width="100%"
            height="100%"
          >
            <rect x="0" y="5" width="100%" height="95%" rx="60" href="rect" />
          </svg>
          <img
            src="@/assets/images/landing_debut/sticker_egalite.png"
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
        <div class="w-[47%] flex relative py-4 pr-8">
          <svg
            class="absolute top-0 draw-svg"
            viewBox="0 0 100% 100%"
            fill="none"
            stroke="black"
            width="100%"
            height="100%"
          >
            <rect x="0" y="5" width="100%" height="95%" rx="60" href="rect" />
          </svg>
          <img
            src="@/assets/images/landing_debut/sticker_innovation.png"
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
      <button
        @click="redirect"
        class="font-bold text-3xl px-8 py-4 rounded-full neue neueBit"
      >
        {{ $t('landing.more') }}
      </button>
    </section>
    <section
      id="3"
      class="min-h-screen flex flex-col items-center justify-center px-8"
    >
      <div class="Title">
        <span class="Title-mask">
          <h2 class="text-7xl font-bold uppercase Title-line">
            {{ $t('landing.solution') }}
          </h2>
        </span>
      </div>
      <div class="w-10/12 flex m-24 relative">
        <div class="w-11/12 flex gap-12 relative" ref="border">
          <svg
            class="absolute top-0 big-draw-svg"
            viewBox="0 0 100% 100%"
            fill="none"
            stroke="black"
            width="100%"
            height="100%"
          >
            <rect x="0" y="5" width="100%" height="95%" rx="60" href="rect" />
          </svg>
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
        </div>
        <div
          class="w-6/12 h-full flex rounded-lg absolute right-0 top-1/4 bg-white neue"
          ref="DNA"
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
            src="@/assets/images/landing_debut/ADN.svg"
            alt="ADN illustration"
            class="pb-16 absolute bottom-[-10%] right-[10%]"
          />
        </div>
      </div>
    </section>
    <section
      id="4"
      class="min-h-screen flex flex-col items-center justify-center px-8"
    >
      <div class="Title">
        <span class="Title-mask">
          <h2 class="text-7xl font-bold uppercase Title-line">
            {{ $t('landing.offer') }}
          </h2>
        </span>
      </div>
      <div
        class="w-10/12 flex gap-4 justify-between items-start m-24 offer-list"
      >
        <div
          class="rounded-md flex flex-col items-center w-full neue offer-item"
        >
          <img
            src="@/assets/images/landing_debut/donutPremium.svg"
            alt=""
            class="w-1/2 -translate-y-1/3"
          />
          <h3 class="text-3xl font-light text-center mb-12 whitespace-pre-line">
            {{ $t('landing.premium') }}
          </h3>
          <span class="text-5xl mb-16 text-center neueBit">$$$<br />$$</span>
          <button
            @click="redirect"
            class="font-bold text-3xl px-8 py-4 rounded-full neue translate-y-1/2 bgo neueBit"
          >
            {{ $t('landing.discover') }}
          </button>
        </div>
        <div class="relative flex flex-col items-center w-full offer-item">
          <svg
            class="absolute top-0 little-draw-svg"
            viewBox="0 0 100% 100%"
            fill="none"
            stroke="black"
            width="100%"
            height="100%"
          >
            <rect x="0" y="5" width="100%" height="95%" rx="25" href="rect" />
          </svg>
          <img
            src="@/assets/images/landing_debut/donutStandard.svg"
            alt=""
            class="w-1/2 -translate-y-1/3"
          />
          <h3 class="text-3xl font-light text-center mb-12 whitespace-pre-line">
            {{ $t('landing.standard') }}
          </h3>
          <span class="text-5xl mb-16 stroke-text neueBit">$$$</span>
        </div>
        <div class="relative flex flex-col items-center w-full offer-item">
          <svg
            class="absolute top-0 little-draw-svg"
            viewBox="0 0 100% 100%"
            fill="none"
            stroke="black"
            width="100%"
            height="100%"
          >
            <rect x="0" y="5" width="100%" height="95%" rx="25" href="rect" />
          </svg>
          <img
            src="@/assets/images/landing_debut/donutReconditionne.svg"
            alt=""
            class="w-1/2 -translate-y-1/3"
          />
          <h3 class="text-3xl font-light text-center mb-12 whitespace-pre-line">
            {{ $t('landing.recond') }}
          </h3>
          <span class="text-5xl mb-16 stroke-text neueBit">$$</span>
        </div>
        <div class="relative flex flex-col items-center w-full offer-item">
          <svg
            class="absolute top-0 little-draw-svg"
            viewBox="0 0 100% 100%"
            fill="none"
            stroke="black"
            width="100%"
            height="100%"
          >
            <rect x="0" y="5" width="100%" height="95%" rx="25" href="rect" />
          </svg>
          <img
            src="@/assets/images/landing_debut/donutOccasion.svg"
            alt=""
            class="w-1/2 -translate-y-1/3"
          />
          <h3 class="text-3xl font-light text-center mb-12 whitespace-pre-line">
            {{ $t('landing.occas') }}
          </h3>
          <span class="text-5xl mb-16 stroke-text neueBit">$</span>
        </div>
        <div class="relative flex flex-col items-center w-full offer-item">
          <svg
            class="absolute top-0 little-draw-svg"
            viewBox="0 0 100% 100%"
            fill="none"
            stroke="black"
            width="100%"
            height="100%"
          >
            <rect x="0" y="5" width="100%" height="95%" rx="25" href="rect" />
          </svg>
          <img
            src="@/assets/images/landing_debut/donutFree.svg"
            alt=""
            class="w-1/2 -translate-y-1/3"
          />
          <h3 class="text-3xl font-light text-center mb-12 whitespace-pre-line">
            {{ $t('landing.unsell') }}
          </h3>
          <span class="text-5xl mb-16 stroke-text neueBit">FREE</span>
        </div>
      </div>
    </section>
    <section
      id="5"
      class="min-h-screen flex flex-col items-center justify-center px-8"
    >
      <div class="Title">
        <span class="Title-mask">
          <h2 class="text-7xl font-bold uppercase Title-line">
            {{ $t('landing.community') }}
          </h2>
        </span>
      </div>
      <div class="w-10/12 flex gap-4 justify-between items-start m-24">
        <div class="relative w-[350px]">
          <h2 class="text-7xl font-bold uppercase">
            {{ $t('landing.satisfaction_percent') }}
          </h2>
          <h3
            class="text-3xl font-bold text-left mb-12 whitespace-pre-line max-w-[300px]"
          >
            {{ $t('landing.satisfaction_text') }}
          </h3>
          <img
            src="@/assets/images/landing_debut/solarsystem.svg"
            alt=""
            class="top-0 absolute"
            style="transform: translate(-20%, -20%)"
          />
          <img
            src="@/assets/images/landing_debut/stickers_love.png"
            alt=""
            class="w-1/2 -translate-y-1/3 absolute translate-x-2/3"
            ref="love"
          />
        </div>

        <div class="relative w-[900px]">
          <ul class="text-xl font-light clientList" ref="clientList">
            <li class="client">
              <img
                src="@/assets/images/landing_debut/client1.png"
                alt=""
                class="w-[100px] h-[100px] mr-[20px]"
              />
              <article>
                <div class="flex justify-between">
                  <div class="text">
                    <h3 class="font-bold text-2xl uppercase">
                      {{ $t('landing.comu_1_name') }}
                    </h3>
                    <h4 class="font-bold">{{ $t('landing.comu_premium') }}</h4>
                    <p style="font-size: 14px">
                      {{ $t('landing.comu_1_ago') }}
                    </p>
                  </div>
                  <div>
                    <img
                      src="@/assets/images/landing_debut/etoiles.png"
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
                src="@/assets/images/landing_debut/client1.png"
                alt=""
                class="w-[100px] h-[100px] mr-[20px]"
              />
              <article>
                <div class="flex justify-between">
                  <div class="text">
                    <h3 class="font-bold text-2xl uppercase">
                      {{ $t('landing.comu_2_name') }}
                    </h3>
                    <h4 class="font-bold">{{ $t('landing.comu_premium') }}</h4>
                    <p style="font-size: 14px">
                      {{ $t('landing.comu_2_ago') }}
                    </p>
                  </div>
                  <div>
                    <img
                      src="@/assets/images/landing_debut/etoiles.png"
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
                src="@/assets/images/landing_debut/client1.png"
                alt=""
                class="w-[100px] h-[100px] mr-[20px]"
              />
              <article>
                <div class="flex justify-between">
                  <div class="text">
                    <h3 class="font-bold text-2xl uppercase">
                      {{ $t('landing.comu_3_name') }}
                    </h3>
                    <h4 class="font-bold">{{ $t('landing.comu_premium') }}</h4>
                    <p style="font-size: 14px">
                      {{ $t('landing.comu_3_ago') }}
                    </p>
                  </div>
                  <div>
                    <img
                      src="@/assets/images/landing_debut/etoiles.png"
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
      <button
        @click="redirect"
        class="font-bold text-3xl px-8 py-4 rounded-full neue mt-[100px] neueBit"
      >
        {{ $t('landing.jump') }}
      </button>
    </section>

    <div class="fadewhite" ref="fadewhite"></div>
  </div>
</template>

<script>
import Background from '~/components/Background.vue'
import gsap, { Power3 } from 'gsap'
// import { ScrollTrigger } from "this.$gsap/dist/ScrollTrigger";

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
    setInterval(() => this.moveCarousel(), 5000)
    this.animations()
  },
  methods: {
    //this.moveCarousel()

    redirect() {
      gsap
        .to(this.$refs.fadewhite, {
          opacity: 1,
          duration: 1,
        })
        .then(() => {
          if (this.$i18n.locale === 'fr') this.$router.push('/fr/videointro')
          else this.$router.push('/en/videointro')
        })
    },
    moveCarousel() {
      //const clients = this.$el.querySelectorAll('.client')

      if (this.clientList) {
        //clientList.querySelector('.client').remove()
        this.firstClient.classList.remove('animate-fade-up-in3')
        this.secondClient.classList.remove('animate-fade-up-in2')
        this.thirdClient.classList.remove('animate-fade-up-in')
      }

      this.clientList = this.$refs.clientList
      this.clients = this.clientList.querySelectorAll('.client')
      this.firstClient = this.clients[0]

      this.secondClient = this.clients[1]
      this.thirdClient = this.clients[2]

      this.copy = this.clients[0].cloneNode(true)

      if (this.clientList) {
        //clientList.querySelector('.client').remove()
        this.firstClient.classList.remove('animate-fade-up-in3')
        this.secondClient.classList.remove('animate-fade-up-in2')
        this.thirdClient.classList.remove('animate-fade-up-in')
      }

      if (this.clientList) {
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
      /* pink rectangle */

      const pinkRectangle = this.$el.querySelector('.pinkRectangle')
      this.$gsap.fromTo(
        pinkRectangle,
        { width: 0, height: 0 },
        {
          height: 100,
          width: 590,
          scrollTrigger: pinkRectangle,
          duration: 2,
          ease: Power3.easeIn,
        }
      )

      const textPink = this.$el.querySelector('.text-pink')
      this.$gsap.fromTo(
        textPink,
        { transform: 'rotate(0)' },
        {
          transform: 'rotate(-2.6deg)',
          scrollTrigger: pinkRectangle,
          duration: 1,
          delay: 4.5,
          ease: Power3.easeOut,
        }
      )

      const whiteRectangle = this.$el.querySelectorAll('.whiteRectangle')
      this.$gsap.to(whiteRectangle, {
        width: 6,
        height: 6,
        duration: 1,
        delay: 2,
        ease: Power3.easeIn,
      })

      // /* Titles */
      var titles = this.$gsap.utils.toArray('.Title, .Title-line')
      titles.forEach((title) => {
        this.$gsap.fromTo(
          title,
          { opacity: 0, transform: 'translate(0%, 100%)' },
          {
            opacity: 1,
            transform: 'translate(0%, 0%)',
            scrollTrigger: title,
            duration: 2,
            ease: Power3.easeInOut,
          }
        )
      })

      /* draw svg */
      const drawSvg = this.$el.querySelectorAll('.draw-svg')
      this.$gsap.fromTo(
        drawSvg,
        { strokeDashoffset: '2000' },
        {
          strokeDashoffset: '0',
          scrollTrigger: drawSvg,
          delay: 2,
          duration: 2,
          stagger: 0.3,
          ease: Power3.easeInOut,
        }
      )

      const bigDrawSvg = this.$el.querySelector('.big-draw-svg')
      this.$gsap.fromTo(
        bigDrawSvg,
        { strokeDashoffset: '4000' },
        {
          strokeDashoffset: '0',
          scrollTrigger: bigDrawSvg,
          duration: 2,
          ease: Power3.easeInOut,
        }
      )

      var offerItem = this.$gsap.utils.toArray('.offer-item')
      const offerList = this.$el.querySelector('.offer-list')

      const littleDrawSvg = this.$el.querySelectorAll('.little-draw-svg')
      this.$gsap.fromTo(
        offerItem,
        { transform: 'translate(600%, 0)' },
        {
          transform: 'translate(0, 0)',
          scrollTrigger: offerList,
          duration: 2,
          delay: 1,
          stagger: 0.3,
          ease: Power3.easeInOut,
        }
      )
      this.$gsap.fromTo(
        littleDrawSvg,
        { strokeDashoffset: '2000' },
        {
          strokeDashoffset: '0',
          duration: 2,
          delay: 3,
          stagger: 0.3,
          scrollTrigger: offerList,
          ease: Power3.easeInOut,
        }
      )
      /* emojis */
      this.$gsap
        .fromTo(
          this.$refs.flames,
          { transform: 'scale(0)' },
          {
            transform: 'scale(1)',
            duration: 2,
            scrollTrigger: this.$refs.flames,
            ease: Power3.easeInOut,
          }
        )
        .then(() => {
          this.$gsap.fromTo(
            this.$refs.flames,
            { transform: 'scale(1) rotate(-20deg)' },
            {
              transform: 'scale(1) rotate(20deg)',
              duration: 2,
              repeat: -1,
              ease: 'none',
              yoyo: true,
            }
          )
        })

      this.$gsap
        .fromTo(
          this.$refs.egalite,
          { transform: 'scale(0)' },
          {
            transform: 'translateX(-25%) scale(1)',
            duration: 2,
            scrollTrigger: this.$refs.egalite,
            ease: Power3.easeInOut,
          }
        )
        .then(() => {
          this.$gsap.fromTo(
            this.$refs.egalite,
            { transform: 'translateX(-25%) scale(1)' },
            {
              transform: 'translateX(-25%) scale(1.5)',
              duration: 2,
              repeat: -1,
              ease: 'none',
              stagger: 0.1,
              yoyo: true,
            }
          )
        })

      this.$gsap
        .fromTo(
          this.$refs.love,
          { transform: 'scale(0) translate(66%, -33%)' },
          {
            transform: 'scale(1) translate(66%, -33%)',
            duration: 2,
            scrollTrigger: this.$refs.love,
            ease: Power3.easeInOut,
          }
        )
        .then(() => {
          this.$gsap.fromTo(
            this.$refs.love,
            { transform: ' translate(66%, -33%) rotate(-20deg)' },
            {
              transform: '  translate(66%, -33%) rotate(20deg)',
              duration: 2,
              repeat: -1,
              ease: 'none',
              yoyo: true,
            }
          )
        })

      this.$gsap
        .fromTo(
          this.$refs.ecologie,
          { transform: 'translateX(-25%) scale(0)' },
          {
            transform: 'translateX(-25%) scale(1)',
            duration: 2,
            scrollTrigger: this.$refs.ecologie,
            ease: Power3.easeInOut,
          }
        )
        .then(() => {
          this.$gsap.fromTo(
            this.$refs.ecologie,
            { transform: ' translateX(-25%) rotate(-20deg)' },
            {
              transform: ' translateX(-25%) rotate(20deg)',
              duration: 2,
              repeat: -1,
              ease: 'none',
              stagger: 0.1,
              yoyo: true,
            }
          )
        })

      this.$gsap
        .fromTo(
          this.$refs.positive,
          { transform: ' scale(0) ' },
          {
            transform: 'translate(-25%, -25%) scale(1)',
            duration: 2,
            scrollTrigger: this.$refs.ecologie,
            ease: Power3.easeInOut,
          }
        )
        .then(() => {
          this.$gsap.fromTo(
            this.$refs.positive,
            { transform: 'translate(-25%, -25%) ' },
            {
              transform: 'translate(-25%, 25%)',
              duration: 2,
              repeat: -1,
              ease: Power3.easeIn,
              stagger: 0.3,
              yoyo: true,
            }
          )
        })

      this.$gsap
        .fromTo(
          this.$refs.innovation,
          { transform: ' scale(0)' },
          {
            transform: 'translate(-25%, -10%)  scale(1)',
            duration: 2,
            scrollTrigger: this.$refs.innovation,
            ease: Power3.easeInOut,
          }
        )
        .then(() => {
          this.$gsap.fromTo(
            this.$refs.innovation,
            { transform: 'translate(-25%, -10%)' },
            {
              transform: 'translate(0)',
              duration: 1,
              repeat: -1,
              ease: Power3.easeIn,
              delay: 0.5,
              yoyo: true,
            }
          )
        })

      this.$gsap.fromTo(
        this.$refs.DNA,
        { transform: 'translate(150%)' },
        {
          transform: 'translate(0)',
          duration: 2,
          ease: Power3.easeOut,
          scrollTrigger: this.$refs.DNA,
          delay: 0.5,
        }
      )
    },
  },
}
</script>

<style scoped>
.land {
  background-image: url(@/assets/images/bgland.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
}
h1 span {
  display: inline-block;
  /*transform: rotate(-2.6deg);*/
}

.name {
  display: inline-block;
  transform: rotate(-4.6deg) translateY(30%);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #1d1d1b;
  /* backdrop-filter: blur(29px); */
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 11px;
}

.neue {
  box-shadow: -3px -5px 17px rgba(255, 255, 255, 0.87),
    9px 25.03px 30px rgba(110, 163, 242, 0.38);
  /* backdrop-filter: blur(40px); */
}

a.neue:not(.bgo),
button.neue:not(.bgo) {
  background: rgba(229, 230, 230, 0.31);
}

a.neue:not(.bgo):hover,
button.neue:not(.bgo):hover {
  background: rgba(229, 230, 230, 0.64);
  box-shadow: inset 1.82px 7.41px 12.62px rgba(15, 84, 228, 0.34),
    inset -2px -3px 6px rgba(255, 255, 255, 0.8);
}

.bgo {
  background: rgba(229, 230, 230, 1);
}

.bgo:hover {
  box-shadow: inset 1.82px 7.41px 12.62px rgba(15, 84, 228, 0.34),
    inset -2px -3px 6px rgba(255, 255, 255, 0.8);
  background: rgba(229, 230, 230, 1);
}

.pink-neue {
  filter: drop-shadow(-3.26669px -5.44448px 18.5112px rgba(255, 255, 255, 0.87))
    drop-shadow(9.80006px 27.2551px 32.6669px rgba(232, 147, 173, 0.47));

  transform-origin: center center;
}

.limited {
  box-shadow: inset 0px 11.638px 25.55px rgba(255, 255, 255, 0.73),
    inset -5.81898px -4.65518px 17.49px rgba(255, 255, 255, 0.71),
    -3px -5px 17px rgba(255, 255, 255, 0.87),
    9px 25.03px 30px rgba(110, 163, 242, 0.38);
  /* backdrop-filter: blur(40px); */
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
  width: 820px;
  filter: drop-shadow(-3px -5px 17px rgba(255, 255, 255, 0.9))
    drop-shadow(9px 25px 30px rgba(110, 143, 242, 0.4));
}

.client .text {
  display: flex;
  flex-wrap: wrap;
}

.client h3 {
  margin-right: 10px;
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
.clientList .client:nth-child(4) {
  z-index: 0;
  left: 50px;
  top: 50px;
}
.draw-svg,
.little-draw-svg {
  stroke-dashoffset: 1000;
  stroke-dasharray: 2000;
}

.little-draw-svg {
  stroke-dashoffset: 2000;
}

.big-draw-svg {
  stroke-dashoffset: 1000;
  stroke-dasharray: 4000;
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
  content: url(@/assets/images/landing_debut/cross.png);
  margin-right: 16px;
}
ul.good li::before {
  content: url(@/assets/images/landing_debut/tick.png);
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

.pinkRectangle {
  height: 0;
  width: 0;
}

.text-pink {
  height: 6rem;
  top: 5rem;
}

.text-pink svg {
  top: -50%;
  right: -5%;
  width: 110%;
}

.whiteRectangle {
  opacity: 1;
  height: 0;
  width: 0;
}

.Title {
  font-size: 2rem;
  opacity: 0;
}

.Title-mask {
  display: block;
  position: relative;
  text-align: start;
  overflow: hidden;
}

.Title-line {
  display: inline-block;
  opacity: 1;
}

.fadewhite {
  z-index: 10000;
  opacity: 0;
  background: white;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  position: fixed;
  top: 0;
}
</style>

<style>
.typed-wrapper {
  width: 100%;
  color: transparent;
  font-size: 6rem;
  height: 0px;
}
.typed-out {
  overflow: hidden;
  white-space: nowrap;
  animation: typing 1s 4s forwards;
  width: 0;
}
.typed-write {
  width: 0;
  position: relative;
  animation: typing-move 1s 4s forwards;
}

.typed-write::after {
  content: '';
  background: #e893ad;
  width: 3px;
  height: 5rem;
  position: absolute;
  bottom: 3.2rem;
  transform: translateY(50%);
  opacity: 0;
  animation: typing-writing 4s 3s forwards;
}
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
@keyframes typing-writing {
  0% {
    left: 0;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  15% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }

  70% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  80% {
    opacity: 1;
  }
  85% {
    opacity: 0;
  }
}

@keyframes typing-move {
  0% {
    left: 0%;
  }
  100% {
    left: 100%;
  }
}
</style>
