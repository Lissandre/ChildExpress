<template>
  <div class="container overflow-x-hidden text-white roc land">
    <section
      id="0"
      class="min-h-screen flex flex-col items-center justify-center px-8"
    >
      <div>
        <i18n
          tag="h1"
          path="reveal.h1_title"
          class="font-bold text-8xl mb-10 whitespace-pre-line"
        >
          <template v-slot:green>
            <span class="text-green relative">
              <div class="typed-out">{{ $t('reveal.h1_title_green') }}</div>
              <div class="typed-wrapper">
                {{ $t('reveal.h1_title_green') }}
              </div>
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
                  class="greenRectangle"
                  x="9.18359"
                  y="30.4434"
                  width="584"
                  height="100"
                  stroke="#61E4B4"
                  stroke-width="2"
                />
                <rect
                  class="whiteRectangle"
                  x="7.16992"
                  y="28.7646"
                  width="6"
                  height="6"
                  fill="white"
                  stroke="#61E4B4"
                  stroke-width="2"
                />
                <rect
                  class="whiteRectangle"
                  x="595.564"
                  y="27.1797"
                  width="6"
                  height="6"
                  fill="white"
                  stroke="#61E4B4"
                  stroke-width="2"
                />
                <rect
                  class="whiteRectangle"
                  x="6.80469"
                  y="127.659"
                  width="6"
                  height="6"
                  fill="white"
                  stroke="#61E4B4"
                  stroke-width="2"
                />
                <rect
                  class="whiteRectangle"
                  x="595.199"
                  y="126.074"
                  width="6"
                  height="6"
                  fill="white"
                  stroke="#61E4B4"
                  stroke-width="2"
                />
              </svg>
            </span>
          </template>
        </i18n>
        <div class="w-full flex justify-between">
          <div class="block flex flex-col justify-between items-start">
            <span class="font-light text-2xl">{{ $t('reveal.subtitle') }}</span>
            <nuxt-link
              :to="localePath('customization')"
              class="font-bold text-3xl px-8 py-4 rounded-full neue neueBit hover:shadow-hoverStateNone"
              >{{ $t('reveal.create_child') }}</nuxt-link
            >
          </div>
          <div
            class="h-48 w-48 flex justify-center items-center rounded-full overflow-hidden limited neue"
          >
            <span class="block">{{ $t('reveal.limited') }}</span>
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
          <h2 class="text-7xl font-bold uppercase Title-line text-withborders">
            {{ $t('reveal.realisations') }}
          </h2>
          <h2 class="text-7xl font-bold uppercase Title-line">
            {{ $t('reveal.realisations') }}
          </h2>
          <h2 class="text-7xl font-bold uppercase Title-line text-withborders">
            {{ $t('reveal.realisations') }}
          </h2>
        </span>
      </div>

      <div class="flex gap-4 justify-center m-24">
        <div class="w-[19%] flex flex-col items-center">
          <span class="name px-4 py-2 uppercase">{{
            $t('reveal.name_1')
          }}</span>
          <video muted loop autoplay class="rounded-[12px]">
            <source src="@/assets/images/webm/bebe1.webm" type="video/webm" />
          </video>
        </div>
        <div class="w-[19%] flex flex-col items-center">
          <span class="name px-4 py-2 uppercase">{{
            $t('reveal.name_2')
          }}</span>
          <video muted loop autoplay class="rounded-[12px]">
            <source src="@/assets/images/webm/bebe2.webm" type="video/webm" />
          </video>
        </div>
        <div class="w-[19%] flex flex-col items-center">
          <span class="name px-4 py-2 uppercase">{{
            $t('reveal.name_3')
          }}</span>
          <video muted loop autoplay class="rounded-[12px]">
            <source src="@/assets/images/webm/bebe3.webm" type="video/webm" />
          </video>
        </div>
        <div class="w-[19%] flex flex-col items-center">
          <span class="name px-4 py-2 uppercase">{{
            $t('reveal.name_4')
          }}</span>
          <video muted loop autoplay class="rounded-[12px]">
            <source src="@/assets/images/webm/bebe4.webm" type="video/webm" />
          </video>
        </div>
        <div class="w-[19%] flex flex-col items-center relative">
          <span class="name px-4 py-2 uppercase">{{
            $t('reveal.name_5')
          }}</span>
          <video muted loop autoplay class="rounded-sm">
            <source src="@/assets/images/webm/bebe5.webm" type="video/webm" />
          </video>
          <img
            src="@/assets/images/landing_fin/sticker_flamme.png"
            ref="flames"
            alt=""
            class="absolute left-[65%] top-[65%] h-2/3"
          />
        </div>
      </div>
      <nuxt-link
        :to="localePath('customization')"
        class="font-bold text-3xl px-8 py-4 rounded-full neue neueBit"
        >{{ $t('reveal.wants_mine') }}</nuxt-link
      >
    </section>
    <section
      id="2"
      class="min-h-screen flex flex-col items-center justify-center px-8"
    >
      <div class="Title">
        <span class="Title-mask">
          <h2 class="text-7xl font-bold uppercase Title-line text-withborders">
            {{ $t('reveal.values') }}
          </h2>
          <h2 class="text-7xl font-bold uppercase Title-line">
            {{ $t('reveal.values') }}
          </h2>
          <h2 class="text-7xl font-bold uppercase Title-line text-withborders">
            {{ $t('reveal.values') }}
          </h2>
        </span>
      </div>
      <div class="flex flex-wrap gap-8 justify-between m-24">
        <div class="w-[47%] flex relative py-4 pr-8">
          <svg
            class="absolute top-0 draw-svg"
            viewBox="0 0 100% 100%"
            fill="none"
            stroke="white"
            width="100%"
            height="100%"
          >
            <rect x="0" y="5" width="100%" height="95%" rx="60" href="rect" />
          </svg>
          <img
            src="@/assets/images/landing_fin/sticker_smile.png"
            alt=""
            class="green-neue"
            ref="ecologie"
          />
          <div class="flex flex-col justify-center">
            <h3 class="font-bold text-3xl uppercase mb-4">
              {{ $t('reveal.eco_title') }}
            </h3>
            <p class="text-xl font-light">
              {{ $t('reveal.eco_description') }} <br />
              <span class="uppercase">{{ $t('reveal.eco_tldr') }}</span>
            </p>
          </div>
        </div>
        <div class="w-[47%] flex relative py-4 pr-8">
          <svg
            class="absolute top-0 draw-svg"
            viewBox="0 0 100% 100%"
            fill="none"
            stroke="white"
            width="100%"
            height="100%"
          >
            <rect x="0" y="5" width="100%" height="95%" rx="60" href="rect" />
          </svg>
          <img
            src="@/assets/images/landing_fin/sticker_sheep.png"
            alt=""
            class="green-neue"
            ref="positive"
          />
          <div class="flex flex-col justify-center">
            <h3 class="font-bold text-3xl uppercase mb-4">
              {{ $t('reveal.positivity_title') }}
            </h3>
            <p class="text-xl font-light">
              {{ $t('reveal.positivity_description') }} <br />
              <span class="uppercase">{{ $t('reveal.positivity_tldr') }}</span>
            </p>
          </div>
        </div>
        <div class="w-[47%] flex relative py-4 pr-8">
          <svg
            class="absolute top-0 draw-svg"
            viewBox="0 0 100% 100%"
            fill="none"
            stroke="white"
            width="100%"
            height="100%"
          >
            <rect x="0" y="5" width="100%" height="95%" rx="60" href="rect" />
          </svg>
          <img
            src="@/assets/images/landing_fin/sticker_rocket.png"
            alt=""
            class="green-neue"
            ref="egalite"
          />
          <div class="flex flex-col justify-center">
            <h3 class="font-bold text-3xl uppercase mb-4">
              {{ $t('reveal.egality_title') }}
            </h3>
            <p class="text-xl font-light">
              {{ $t('reveal.egality_description') }} <br />
              <span class="uppercase">{{ $t('reveal.egality_tldr') }}</span>
            </p>
          </div>
        </div>
        <div class="w-[47%] flex relative py-4 pr-8">
          <svg
            class="absolute top-0 draw-svg"
            viewBox="0 0 100% 100%"
            fill="none"
            stroke="white"
            width="100%"
            height="100%"
          >
            <rect x="0" y="5" width="100%" height="95%" rx="60" href="rect" />
          </svg>
          <img
            src="@/assets/images/landing_fin/sticker_glass.png"
            alt=""
            class="green-neue innovation"
            ref="innovation"
          />
          <div class="flex flex-col justify-center">
            <h3 class="font-bold text-3xl uppercase mb-4">
              {{ $t('reveal.innovation_title') }}
            </h3>
            <p class="text-xl font-light">
              {{ $t('reveal.innovation_description') }} <br />
              <span class="uppercase">{{ $t('reveal.innovation_tldr') }}</span>
            </p>
          </div>
        </div>
      </div>
      <nuxt-link
        :to="localePath('customization')"
        class="font-bold text-3xl px-8 py-4 rounded-full neue neueBit"
        >{{ $t('reveal.more') }}</nuxt-link
      >
    </section>
    <section
      id="3"
      class="min-h-screen flex flex-col items-center justify-center px-8"
    >
      <div class="Title">
        <span class="Title-mask">
          <h2 class="text-7xl font-bold uppercase Title-line text-withborders">
            {{ $t('reveal.solution') }}
          </h2>
          <h2 class="text-7xl font-bold uppercase Title-line">
            {{ $t('reveal.solution') }}
          </h2>
          <h2 class="text-7xl font-bold uppercase Title-line text-withborders">
            {{ $t('reveal.solution') }}
          </h2>
        </span>
      </div>
      <div class="w-10/12 flex m-24 relative">
        <div class="w-11/12 flex gap-12 relative" ref="border">
          <svg
            class="absolute top-0 big-draw-svg"
            viewBox="0 0 100% 100%"
            fill="none"
            stroke="white"
            width="100%"
            height="100%"
          >
            <rect x="0" y="5" width="100%" height="95%" rx="60" href="rect" />
          </svg>
          <div class="pl-20 py-16">
            <h3 class="font-bold text-3xl uppercase mb-6">
              {{ $t('reveal.give_title') }}
            </h3>
            <ul class="text-xl font-light bad">
              <li>{{ $t('reveal.give_1') }}</li>
              <li>{{ $t('reveal.give_2') }}</li>
              <li>{{ $t('reveal.give_3') }}</li>
              <li>{{ $t('reveal.give_4') }}</li>
              <li>{{ $t('reveal.give_5') }}</li>
              <li>{{ $t('reveal.give_6') }}</li>
            </ul>
          </div>
          <div class="py-16">
            <h3 class="font-bold text-3xl uppercase mb-6">
              {{ $t('reveal.adopt_title') }}
            </h3>
            <ul class="text-xl font-light bad">
              <li>{{ $t('reveal.adopt_1') }}</li>
              <li>{{ $t('reveal.adopt_2') }}</li>
              <li>{{ $t('reveal.adopt_3') }}</li>
              <li>{{ $t('reveal.adopt_4') }}</li>
            </ul>
          </div>
        </div>
        <div
          class="w-6/12 h-full flex rounded-lg absolute right-0 top-1/4 bg-black neue"
          ref="DNA"
        >
          <div class="pl-20 py-16">
            <h3 class="font-bold text-3xl uppercase mb-6">
              "{{ $t('reveal.childexpresser_title') }}"
            </h3>
            <ul class="text-xl font-light good">
              <li>{{ $t('reveal.childexpresser_1') }}</li>
              <li>{{ $t('reveal.childexpresser_2') }}</li>
              <li>{{ $t('reveal.childexpresser_3') }}</li>
              <li>{{ $t('reveal.childexpresser_4') }}</li>
              <li>{{ $t('reveal.childexpresser_5') }}</li>
              <li>{{ $t('reveal.childexpresser_6') }}</li>
            </ul>
          <video muted loop autoplay class="rounded-sm pb-16 absolute bottom-[-10%] right-[0%] h-[90%] adn2">
            <source src="@/assets/images/landing_fin/ADN2.webm" type="video/webm" />
          </video>
          </div>
        </div>
      </div>
    </section>
    <section
      id="4"
      class="min-h-screen flex flex-col items-center justify-center px-8"
    >
      <div class="Title">
        <span class="Title-mask">
          <h2 class="text-7xl font-bold uppercase Title-line text-withborders">
            {{ $t('reveal.offer') }}
          </h2>
          <h2 class="text-7xl font-bold uppercase Title-line">
            {{ $t('reveal.offer') }}
          </h2>
          <h2 class="text-7xl font-bold uppercase Title-line text-withborders">
            {{ $t('reveal.offer') }}
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
            src="@/assets/images/landing_fin/diam.png"
            alt=""
            class="w-1/2 -translate-y-1/3"
          />
          <h3
            class="text-3xl font-light text-center whitespace-pre-line uppercase"
          >
            {{ $t('reveal.premium') }}
          </h3>
          <span class="text-9xl text-center neueBit">70%</span>

          <span class="text-xl mb-16 text-center"
            >Ont préférés privilégier le physique aux qualités humaines</span
          >
          <nuxt-link
            :to="localePath('customization')"
            class="font-bold text-3xl px-8 py-4 rounded-full neue translate-y-1/2 bgo neueBit"
            >{{ $t('reveal.discover') }}</nuxt-link
          >
        </div>
        <div class="relative flex flex-col items-center w-full offer-item">
          <svg
            class="absolute top-0 little-draw-svg"
            viewBox="0 0 100% 100%"
            fill="none"
            stroke="white"
            width="100%"
            height="100%"
          >
            <rect x="0" y="5" width="100%" height="95%" rx="25" href="rect" />
          </svg>
          <img
            src="@/assets/images/landing_fin/silent.png"
            alt=""
            class="w-1/2 -translate-y-1/3 backdrop-blur-[20px]"
          />
          <h3
            class="text-3xl font-light text-center whitespace-pre-line uppercase"
          >
            {{ $t('reveal.standard') }}
          </h3>
          <span class="text-9xl text-center neueBit">50%</span>
          <span class="text-xl mb-16 text-center"
            >Ne veulent pas que leur enfant fasse du bruit..</span
          >
        </div>
        <div class="relative flex flex-col items-center w-full offer-item">
          <svg
            class="absolute top-0 little-draw-svg"
            viewBox="0 0 100% 100%"
            fill="none"
            stroke="white"
            width="100%"
            height="100%"
          >
            <rect x="0" y="5" width="100%" height="95%" rx="25" href="rect" />
          </svg>
          <img
            src="@/assets/images/landing_fin/balance.png"
            alt=""
            class="w-1/2 -translate-y-1/3 backdrop-blur-[20px]"
          />
          <h3
            class="text-3xl font-light text-center whitespace-pre-line uppercase"
          >
            {{ $t('reveal.recond') }}
          </h3>
          <span class="text-9xl text-center neueBit">2KG</span>
          <span class="text-xl mb-16 text-center"
            >Ont privilégié la minceur du bébé à la santé</span
          >
        </div>
        <div class="relative flex flex-col items-center w-full offer-item">
          <svg
            class="absolute top-0 little-draw-svg"
            viewBox="0 0 100% 100%"
            fill="none"
            stroke="white"
            width="100%"
            height="100%"
          >
            <rect x="0" y="5" width="100%" height="95%" rx="25" href="rect" />
          </svg>
          <img
            src="@/assets/images/landing_fin/eye.png"
            alt=""
            class="w-1/2 -translate-y-1/3 backdrop-blur-[20px]"
          />
          <h3
            class="text-3xl font-light text-center whitespace-pre-line uppercase"
          >
            {{ $t('reveal.occas') }}
          </h3>
          <span class="text-9xl text-center neueBit">70%</span>
          <span class="text-xl mb-16 text-center"
            >Ont choisi les yeux bleus pour leur bébé</span
          >
        </div>
        <div class="relative flex flex-col items-center w-full offer-item">
          <svg
            class="absolute top-0 little-draw-svg"
            viewBox="0 0 100% 100%"
            fill="none"
            stroke="white"
            width="100%"
            height="100%"
          >
            <rect x="0" y="5" width="100%" height="95%" rx="25" href="rect" />
          </svg>
          <img
            src="@/assets/images/landing_fin/faces.png"
            alt=""
            class="w-1/2 -translate-y-1/3 backdrop-blur-[20px]"
          />
          <h3
            class="text-3xl font-light text-center whitespace-pre-line uppercase"
          >
            {{ $t('reveal.unsell') }}
          </h3>
          <span class="text-9xl text-center neueBit">90%</span>
          <span class="text-xl mb-16 text-center"
            >Ont écoutés les suggestions d’E-gène</span
          >
        </div>
      </div>
    </section>
    <section
      id="5"
      class="min-h-screen flex flex-col items-center justify-center px-8"
    >
      <div class="Title">
        <span class="Title-mask">
          <h2 class="text-7xl font-bold uppercase Title-line text-withborders">
            {{ $t('reveal.community') }}
          </h2>
          <h2 class="text-7xl font-bold uppercase Title-line">
            {{ $t('reveal.community') }}
          </h2>
          <h2 class="text-7xl font-bold uppercase Title-line text-withborders">
            {{ $t('reveal.community') }}
          </h2>
        </span>
      </div>
      <div class="w-10/12 flex gap-4 justify-between items-start m-24">
        <div class="relative w-[350px]">
          <h2 class="text-7xl font-bold uppercase">
            {{ $t('reveal.satisfaction_percent') }}
          </h2>
          <h3
            class="text-3xl font-bold text-left mb-12 max-w-[300px]"
          >
            {{ $t('reveal.satisfaction_text') }}
          </h3>
          <img
            src="@/assets/images/landing_debut/solarsystem.svg"
            alt=""
            class="top-0 absolute"
            style="transform: translate(-20%, -20%)"
          />
          <img
            src="@/assets/images/landing_fin/mdr.png"
            alt=""
            class="w-1/2 -translate-y-1/3 absolute translate-x-2/3"
            ref="love"
          />
        </div>

        <div class="relative w-[900px]">
          <ul class="text-xl font-light clientList" ref="clientList">
            <li class="client">
              <img
                src="@/assets/images/clientdark.png"
                alt=""
                class="w-[100px] h-[100px] mr-[20px]"
              />
              <article>
                <div class="flex justify-between">
                  <div class="text">
                    <h3 class="font-bold text-2xl uppercase">
                      {{ $t('reveal.comu_1_name') }}
                    </h3>
                    <h4 class="font-bold">{{ $t('reveal.comu_premium') }}</h4>
                    <p style="font-size: 14px">
                      {{ $t('reveal.comu_1_ago') }}
                    </p>
                  </div>
                  <div>
                    <img
                      src="@/assets/images/etoilesdark.png"
                      alt=""
                      class=""
                    />
                  </div>
                </div>
                <p>{{ $t('reveal.comu_1_comment') }}</p>
              </article>
            </li>
            <li class="client">
              <img
                src="@/assets/images/clientdark.png"
                alt=""
                class="w-[100px] h-[100px] mr-[20px]"
              />
              <article>
                <div class="flex justify-between">
                  <div class="text">
                    <h3 class="font-bold text-2xl uppercase">
                      {{ $t('reveal.comu_2_name') }}
                    </h3>
                    <h4 class="font-bold">{{ $t('reveal.comu_premium') }}</h4>
                    <p style="font-size: 14px">
                      {{ $t('reveal.comu_2_ago') }}
                    </p>
                  </div>
                  <div>
                    <img
                      src="@/assets/images/etoilesdark.png"
                      alt=""
                      class=""
                    />
                  </div>
                </div>
                <p>{{ $t('reveal.comu_2_comment') }}</p>
              </article>
            </li>
            <li class="client">
              <img
                src="@/assets/images/clientdark.png"
                alt=""
                class="w-[100px] h-[100px] mr-[20px]"
              />
              <article>
                <div class="flex justify-between">
                  <div class="text">
                    <h3 class="font-bold text-2xl uppercase">
                      {{ $t('reveal.comu_3_name') }}
                    </h3>
                    <h4 class="font-bold">{{ $t('reveal.comu_premium') }}</h4>
                    <p style="font-size: 14px">
                      {{ $t('reveal.comu_3_ago') }}
                    </p>
                  </div>
                  <div>
                    <img
                      src="@/assets/images/etoilesdark.png"
                      alt=""
                      class=""
                    />
                  </div>
                </div>
                <p>{{ $t('reveal.comu_3_comment') }}</p>
              </article>
            </li>
          </ul>
        </div>
      </div>
      <nuxt-link
        :to="localePath('customization')"
        class="font-bold text-3xl px-8 py-4 rounded-full neue mt-[100px] neueBit"
        >{{ $t('reveal.jump') }}</nuxt-link
      >
    </section>
    <Chatbot />
  </div>
</template>

<script>
import Background from '~/components/Background.vue'
import { Power3 } from 'gsap'
// import { ScrollTrigger } from "this.$gsap/dist/ScrollTrigger";

export default {
  components: { Background },
  name: 'Reveal',
  layout: 'landing',
  nuxtI18n: {
    paths: {
      en: '/oops',
      fr: '/mince',
    },
  },
  mounted() {
    setInterval(() => this.moveCarousel(), 5000)
    this.animations()
  },
  methods: {
    //this.moveCarousel()

    moveCarousel() {
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
      /* green rectangle */

      const greenRectangle = this.$el.querySelector('.greenRectangle')
      this.$gsap.fromTo(
        greenRectangle,
        { width: 0, height: 0 },
        {
          height: 100,
          width: 590,
          scrollTrigger: greenRectangle,
          duration: 2,
          ease: Power3.easeIn,
        }
      )

      const textgreen = this.$el.querySelector('.text-green')
      this.$gsap.fromTo(
        textgreen,
        { transform: 'rotate(0)' },
        {
          transform: 'rotate(-2.6deg)',
          scrollTrigger: greenRectangle,
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
            transform: 'translateX(-25%) scale(0.8)',
            duration: 2,
            scrollTrigger: this.$refs.egalite,
            ease: Power3.easeInOut,
          }
        )
        .then(() => {
          this.$gsap.fromTo(
            this.$refs.egalite,
            { transform: 'translateX(-25%) scale(0.8)' },
            {
              transform: 'translateX(-25%) scale(1)',
              duration: 2,
              repeat: -1,
              ease: 'none',
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
              yoyo: true,
            }
          )
        })

      this.$gsap
        .fromTo(
          this.$refs.positive,
          { transform: 'scale(0)' },
          {
            transform: 'translateX(-25%) scale(0.8)',
            duration: 2,
            scrollTrigger: this.$refs.egalite,
            ease: Power3.easeInOut,
          }
        )
        .then(() => {
          this.$gsap.fromTo(
            this.$refs.positive,
            { transform: 'translateX(-25%) scale(0.8)' },
            {
              transform: 'translateX(-25%) scale(1)',
              duration: 2,
              repeat: -1,
              ease: 'none',
              yoyo: true,
            }
          )
        })

      this.$gsap
        .fromTo(
          this.$refs.innovation,
          { transform: 'translateX(-25%) scale(0)' },
          {
            transform: 'translateX(-25%) scale(1) rotate(-20deg)',
            duration: 2,
            scrollTrigger: this.$refs.innovation,
            ease: Power3.easeInOut,
          }
        )
        .then(() => {
          this.$gsap.fromTo(
            this.$refs.innovation,
            { transform: ' translateX(-25%) rotate(-20deg)' },
            {
              transform: ' translateX(-25%) rotate(20deg)',
              duration: 2,
              repeat: -1,
              ease: 'none',
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

.adn2 {
  mix-blend-mode: difference; 
}
h1 span {
  display: inline-block;
  /*transform: rotate(-2.6deg);*/
}

.name {
  display: inline-block;
  transform: rotate(-4.6deg) translateY(30%);
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid #fff;
  /* backdrop-filter: blur(29px); */
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 11px;
}

.neue {
  box-shadow: 10px 29px 40px #000000, -8px -11px 19px rgba(97, 228, 180, 0.25);
  /* backdrop-filter: blur(40px); */
}

a.neue:not(.bgo),
button.neue:not(.bgo) {
  background: #1d1d1b;
}
.bgo {
  background: #1d1d1b;
}

a.neue:not(.bgo):hover,
button.neue:not(.bgo):hover {
  background: #1d1d1b;
  box-shadow: inset 2.54201px 5.36px 12.43px #000000,
    inset -3.87656px -5.4px 9.57px rgba(255, 255, 255, 0.44);
}

.bgo:hover {
  background: #1d1d1b;
  box-shadow: inset 2.54201px 5.36px 12.43px #000000,
    inset -3.87656px -5.4px 9.57px rgba(255, 255, 255, 0.44);
}

.green-neue {
  filter: drop-shadow(9.73118px 28.2204px 38.9247px #000000)
    drop-shadow(-7.78495px -10.7043px 18.4892px rgba(97, 228, 180, 0.25));
  transform-origin: center center;
}

.limited {
  box-shadow: 14px 15px 19px rgba(188, 72, 13, 0.28),
    inset -7px -6px 10px rgba(255, 255, 255, 0.25),
    inset 0px 11px 10px rgba(255, 255, 255, 0.25);
  /* backdrop-filter: blur(40px); */
  background: #bc480d;
}

.client {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.95);
  border-radius: 60px;
  padding: 35px 90px;
  display: flex;
  flex-direction: row;
  transition: all ease 0.5s;
  width: 820px;
  box-shadow: 10px 29px 40px #000000, -8px -11px 19px rgba(97, 228, 180, 0.25);
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
ul.good li::before {
  content: url(@/assets/images/landing_debut/whitecross.png);
  margin-right: 16px;
}
ul.bad li::before {
  content: url(@/assets/images/landing_debut/whitetick.png);
  margin-right: 16px;
}

.border {
  border-color: #fff;
}

section {
  scroll-margin-top: 4rem;
}

.greenRectangle {
  height: 0;
  width: 0;
}

.text-green {
  height: 6rem;
  top: 12rem;
}

.text-green svg {
  top: -50%;
  right: -7.5%;
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
  display: flex;
  position: relative;
  text-align: start;
  overflow: hidden;
}

.Title-line {
  display: inline-block;
  opacity: 1;
  white-space: nowrap;
  margin: 0 20px;
}

.text-withborders {
  text-shadow: 2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff,
    1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;
  color: #111;
  white-space: nowrap;
}

video {
  mix-blend-mode: color-dodge;
}

.innovation {
  height: fit-content;
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
  margin-left: 20px;
}
.typed-write {
  width: 0;
  position: relative;
  animation: typing-move 1s 4s forwards;
}

.typed-write::after {
  content: '';
  background: #61e4b4;
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
