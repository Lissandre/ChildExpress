<template>
  <svg
    width="52"
    height="104"
    viewBox="0 0 52 104"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_1496_519)" class="persona_face">
      <circle
        cx="25.5"
        cy="17.5"
        r="8.5"
        stroke-width="2"
        shape-rendering="geometricPrecision"
      />
    </g>
    <g filter="url(#filter1_d_1496_519)" class="persona_body active">
      <path
        stroke-width="2"
        d="M28.5991 30.0439H22.7353C15.7018 30.0439 10 35.7457 10 42.7793V60.6758C10 63.9221 12.6316 66.5537 15.8778 66.5537H17.2741V87.5212C17.2741 90.7675 19.9057 93.3991 23.1519 93.3991H28.7421C31.9883 93.3991 34.6199 90.7675 34.6199 87.5212V66.5537H35.4566C38.7029 66.5537 41.3345 63.9221 41.3345 60.6758V42.7793C41.3345 35.7457 35.6327 30.0439 28.5991 30.0439Z"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_1496_519"
        x="7"
        y="0"
        width="37"
        height="37"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="4.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1496_519"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1496_519"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_d_1496_519"
        x="0"
        y="20.0439"
        width="51.334"
        height="83.3555"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1496_519"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1496_519"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
</template>

<script>
import { useStore } from '@/stores/'

export default {
  name: 'Persona',
  data() {
    return {
      currentFocus: 'body',
    }
  },
  setup() {
    const store = useStore()
    return { store }
  },
  mounted() {
    this.personaBody = document.querySelector('.persona_body')
    this.personaFace = document.querySelector('.persona_face')

    this.changeFocus()

    this.store.$subscribe((mutation, state) => {
      this.currentFocus = state.face

      this.changeFocus()
    })
  },
  methods: {
    changeFocus() {
      if (this.currentFocus === 'face' || this.currentFocus === 'middle') {
        this.personaFace.classList.add('active')
        this.personaBody.classList.remove('active')
      } else {
        this.personaFace.classList.remove('active')
        this.personaBody.classList.add('active')
      }
    },
  },
}
</script>

<style scoped>
svg {
  position: absolute;
  left: 30px;
  bottom: 30px;
  z-index: 1;
  pointer-events: all;
}

.persona_body path,
.persona_face circle {
  stroke: white;
  cursor: pointer;
}
.persona_body.active {
  fill: white;
}
.persona_face.active {
  fill: white;
}
</style>
