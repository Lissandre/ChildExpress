<template>
  <footer
    class="py-12 w-full flex justify-center"
    :class="$route.name.includes('landing') ? 'text-black' : 'text-white'"
  >
    <div class="container flex flex-col items-center justify-center">
      <div>
        <div>
          <nuxtLink :to="localePath('customization')" class="font-bold">{{
            $t('footer.shop')
          }}</nuxtLink>
          | <a href="">{{ $t('footer.help') }}</a> |
          <a href="">{{ $t('footer.contact') }}</a> |
          <a href="">{{ $t('footer.conditions') }}</a> |
          <span>LOGOS</span>
        </div>
        <span>{{ $t('footer.rights') }}</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
footer.text-black {
  box-shadow: inset 0px 7.13693px 28.5477px rgba(255, 255, 255, 0.86),
    inset -3.56847px -2.85477px 13.5602px rgba(255, 255, 255, 0.7);
  /* backdrop-filter: blur(12.8465px); */
  background: rgba(255, 255, 255, 0.18);
}
footer.text-white {
  box-shadow: inset 0px 7.13693px 28.5477px rgba(97, 228, 180, 0.19),
    inset -3.56847px -2.85477px 13.5602px rgba(255, 255, 255, 0.7);
  background: rgba(29, 29, 27, 0.39);
}
</style>
