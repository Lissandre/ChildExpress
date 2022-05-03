<template>
  <div class="pb-4 text-gray-500 pointer-events-auto absolute right-[100px] bottom-[100px] text-white z-[1]">
    <nuxt-link
      :to="localePath({name: 'configuration-step', params: {step: Number($route.params.step) + 1}})"
      class="w-20 z-[1] bg-blue px-20 py-4 flex justify-center rounded shadow cursor-pointer hover:shadow-hoverState transition"
    >{{ locale }}</nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'InputRange',
  props: ['input', 'locale'],

  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>