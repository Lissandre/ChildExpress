<template>
  <div
    class="
      pb-4
      text-gray-500
      pointer-events-auto
      absolute
      right-[100px]
      bottom-[100px]
      text-white
      z-[1]
      text-base
      submit-wrapper
    "
  >
    <input
      :type="input.type"
      :name="input.name"
      :value="locale"
      :key="input.name"
      :class="`w-20 z-[1] bg-blue px-20 py-4 flex justify-center rounded shadow cursor-pointer hover:shadow-hoverState transition neueBit text-2xl ${input.class}`"
    />
  </div>
</template>

<script>
export default {
  name: 'InputSubmit',
  props: ['input', 'locale'],

  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>