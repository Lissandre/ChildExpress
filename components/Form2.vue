<template>
  <div class="flex flex-col relative h-full w-full">
    <Focus />

    <form @submit.prevent="prevent" class="h-full w-full" id="form2">
      <div class="face">
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
import { form2 } from '@/data/forms.json'
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

        // console.log(this.store.isFace)
        if (this.store.isFace === 'middle') {
          this.$helpers.updateInput(e.type, e.type, e.type)
          this.store.isFace = 'body'
        } else this.store.toggleIsFace('middle')
      }, 1000)
    },

    soundEvents() {
      requestAnimationFrame(() => {
        if ($nuxt)
          $nuxt.$emit('updateSound', 'form2', 'speech', 'intro', 'speech1')
      })
    },
    inputChange(type, name, value, optional) {
      this.storeChange(type, name, value)
      if ((name === 'skin')) {

        console.log(value)
        if(value.b < 150 && value.r > 150 && value.g > 150 )
          $nuxt.$emit('updateSound', 'form2', type, name, 'small')
        else
          setInterval(() => {
              $nuxt.$emit('updateSound', 'form2', type, name, 'different')
          }, 9000)
        $nuxt.$emit('updateSound', 'form2', type, name, 'change')
      } else {
        console.log(type, name, value)
        $nuxt.$emit('updateSound', 'form2', type, name, value)

      }
    },

    storeChange(type, name, value) {
      if(name === 'overallSize') {
        value = value * 4
      }
      if(name === 'scale') {
        value = (value * 100).toFixed(0)
      }
      console.log(value)
      this.$helpers.updateInput(type, name, value)
    }
  },
}
</script>

<style scoped>

.face div {
  z-index: 2;
}
.face div:nth-child(1) {
  position: absolute;
  right: 30%;
  top: 50%;
}
.face div:nth-child(2) {
  position: absolute;
  right: 10%;
  top: 30%;
}

.face div:nth-child(3) {
  position: absolute;
  left: 10%;
  top: 30%;
}


#form2 > .hair-color label {
  flex-basis: 0;
}

div > fieldset {
  backdrop-filter: blur(20px);
}
</style>
