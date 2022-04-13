<template>
  <div class="bottom-1/2 pb-4 text-gray-500 left-1/4 pointer-events-auto">
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
