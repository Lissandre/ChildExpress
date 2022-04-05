<template>
  <div>
    <LocaleSwitcher />
    <Tutorial />
    <Range />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
    }
  },
  mounted() {
    console.log(this.range)
  },
  methods: {
  },
}
</script>
