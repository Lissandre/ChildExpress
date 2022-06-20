<template>
  <div class="flex flex-col relative h-full w-full">
    <Focus />
    <div class="videoList" ref="videoList">
      <video muted loop autoplay class="rounded-sm">
        <source src="@/assets/images/webm/graphic_1.webm" type="video/webm" />
      </video>
      <video muted loop autoplay class="rounded-sm babyGraphic">
        <source src="@/assets/images/webm/graphic_2.webm" type="video/webm" />
      </video>
      <video muted loop autoplay class="rounded-sm">
        <source src="@/assets/images/webm/graphic_3.webm" type="video/webm" />
      </video>
    </div>
    <form @submit.prevent="prevent" class="h-full w-full" id="form2">
      <div class="body" ref="content">
        <component
          v-for="input in inputs"
          v-if="input.class.includes(store.isFace)"
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
              `form2.${slugify(`${input.type}_${input.name}`, {
                replacement: '_',
                lower: true,
              })}`
            )
          "
        ></component>
      </div>
    </form>

    <Persona />
  </div>
</template>

<script>
import { useStore } from '@/stores/'
import form2 from '@/data/forms/form2.json'
import slugify from 'slugify'

export default {
  name: 'Form2',
  data() {
    return {
      name: 'form2',
      inputs: [],
      slugify: slugify,
    }
  },
  setup() {
    const store = useStore()
    return { store }
  },
  mounted() {
    this.inputs = form2.inputs

    this.soundEvents()

    this.$nuxt.$scene.assets.on('ressourcesReady', () => {
      this.$nuxt.$scene.init()
    })

    this.store.$onAction(({ name, store, args, after, onError }) => {
      if (name != 'toggleIsFace') return
      after(
        (result) => {
          if (store.face === 'face') this.replaceContent('body', 'face')
          else if (store.face === 'middle')
            this.replaceContent('face', 'middle')
        },
        { once: true }
      )
    })
  },

  methods: {
    changeRange(id, e) {
      this.store.changeRange(id, e.target.value)
    },
    prevent(e) {
      e.preventDefault()
      this.$refs.inputs.forEach((input) => {
        const fieldset = input.$el.getElementsByTagName('fieldset')[0]
        if (fieldset) {
          fieldset.classList.remove('animate-bounce-in')
          fieldset.classList.add('animate-bounce-out')
        }
      })

      setTimeout(() => {
        if (this.store.face === 'middle') {
          this.$helpers.updateInput(e.type, e.type, e.type)
          this.store.toggleIsFace('body')
          this.replaceContent('body', 'middle')
        } else {
          this.store.toggleIsFace('middle')
        }
      }, 1000)
    },

    replaceContent(oldClasslist, newClasslist) {
      if (this.$refs.content) {
        this.$refs.content.classList.remove(oldClasslist)
        this.$refs.content.classList.add(newClasslist)
      }
    },
    soundEvents() {
      requestAnimationFrame(() => {
        if ($nuxt)
          $nuxt.$emit('updateSound', 'form2', 'speech', 'intro', 'speech1')
      })
    },
    inputChange(type, name, value, optional) {
      this.storeChange(type, name, value, 'form2')

      if (name === 'skin') {
        if (value.b < 150 && value.r > 150 && value.g > 150)
          $nuxt.$emit('updateSound', 'form2', type, name, 'small')
        else
          setInterval(() => {
            $nuxt.$emit('updateSound', 'form2', type, name, 'different')
          }, 9000)
        $nuxt.$emit('updateSound', 'form2', type, name, 'change')
      } else if (name === 'hairStyle') {
        setTimeout(() => {
          $nuxt.$emit('updateSound', 'form2', type, name, 'different')
        }, 5000)
      } else if (name === 'health' || name === 'scale') {
        $nuxt.$emit('updateSound', 'form2', 'speech', name, 'speech1')
        console.log(type, name, value)
      } else {
        $nuxt.$emit('updateSound', 'form2', type, name, value)
      }
    },

    storeChange(type, name, value, step) {
      if (name === 'overallSize') {
        value = value * 4
      }
      if (name === 'scale') {
        value = (value * 100).toFixed(0)
      }

      console.log(type, name, value, step)
      this.$helpers.updateInput(type, name, value, step)
    },
  },
}
</script>

<style>
.face.range input {
  display: block;
  margin: 12px auto;
}
.face .range-label {
  margin: 0 !important;
  text-align: center;
  color: black;
}

#form2 .circle-slider {
  box-shadow: none !important;
}
</style>

<style scoped>
.videoList {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  position: absolute;
  right: 0;
  top: 20%;
}
video {
  mix-blend-mode: screen;
  z-index: 2;
  width: 250px;
  margin-bottom: 50px;
}

.babyGraphic {
  width: 200px;
}
.face div,
.body > div,
.middle div {
  z-index: 2;
  position: absolute;
}

.face > div:nth-child(1) {
  left: 15%;
  top: 20%;
}
.face > div:nth-child(2) {
  left: 10%;
  top: 40%;
}
.face > div:nth-child(3) {
  left: 15%;
  bottom: 40%;
}

.face > div:nth-child(4) {
  left: 15%;
  bottom: 30%;
}
.face > div:nth-child(5) {
  right: 40%;
  bottom: 60%;
}

.face > div:nth-child(6) {
  right: 40%;
  bottom: 50%;
}

.face > div:nth-child(7) {
  right: 35%;
  top: 10%;
}

.face > div:nth-child(8) {
  right: 35%;
  top: 25%;
}

.body > div:nth-child(1) {
  right: 30%;
  top: 45%;
}
.body > div:nth-child(2) {
  left: 30%;
  top: 20%;
}
.body > div:nth-child(3) {
  right: 35%;
  top: 45%;
}

.middle > div:nth-child(1) {
  left: 20%;
  top: 25%;
}
.middle > div:nth-child(2) {
  right: 30%;
  top: 50%;
}
.middle > div:nth-child(3) {
  left: 20%;
  bottom: 15%;
}

#form2 > .hair-color label {
  flex-basis: 0;
}

div > fieldset {
  backdrop-filter: blur(20px);
}
</style>
