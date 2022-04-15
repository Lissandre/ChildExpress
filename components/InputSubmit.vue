<template>
  <div class="pb-4 text-gray-500 pointer-events-auto  absolute right-[100px] bottom-[100px]">
    <input
      :type="input.type"
      :name="input.name"
      :value="locale"
      :key="input.name"
      class="w-20 z-[1]"
    />
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
  methods: {
  },
}
</script>
