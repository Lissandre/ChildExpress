<template>
  <div class="flex flex-col absolute bottom-1/2 left-20">
    <form
      @submit.prevent="prevent"
      class="z-[3]"
      @click="changeZindex"
      id="form1"
    >
      <component
        v-for="input in inputs"
        :key="input.name"
        :is="input.component"
        :input="input"
        v-on:updateInput="(a, b, c) => $helpers.updateInput(a, b, c)"
        :locale="
          $t(
            `form1.${slugify(`${input.type}_${input.name}`, {
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
import { form1 } from '@/data/forms.json'
import slugify from 'slugify'

export default {
  name: 'Form1',
  data() {
    return {
      name: 'form1',
      inputs: [],
      slugify: slugify,
    }
  },
  setup() {
    const store = useStore()
    return { store }
  },
  mounted() {
    this.inputs = form1.inputs
  },
  methods: {
    prevent(e) {
      e.preventDefault()
      this.$helpers.updateInput(e.type, e.type, e.type)
    },

    changeZindex(e) {
      const form1 = document.getElementById('form1')
      if (form1.classList.contains('behind')) {
        form1.classList.remove('behind')
      } else {
        form1.classList.add('behind')
      }
    },
  },
}
</script>

<style scoped>
form {
  background: rgb(255, 255, 255);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0) 0%,
    rgba(210, 223, 238, 1) 100%
  );
  transition: all ease-out 0.5s;
}
.behind {
  filter: blur(2px);
  z-index: 1;
  transform: perspective(800px) rotate3d(0, 1, 0, 45deg) scale3d(0.9, 0.9, 0.9);
  
}
</style>