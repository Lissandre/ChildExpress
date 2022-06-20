<template>
  <header
    class="fixed top-0 w-full z-[9999] roc"
    :class="$route.name.includes('landing') ? 'text-black' : 'text-white'"
  >
    <div class="container flex justify-between py-4 px-8">
      <div class="flex items-center gap-8">
        <a href="#0">
          <img
            src="@/assets/images/logoChildExpressBlack.svg"
            alt="Logo ChildExpress"
            v-if="!dark"
          />
          <img
            src="@/assets/images/logoChildExpressWhite.svg"
            alt="Logo ChildExpress"
            v-else
          />
        </a>
        <nav class="flex gap-8">
          <a href="#1">{{ $t('header.realisations') }}</a>
          <a href="#2">{{ $t('header.values') }}</a>
          <a href="#3">{{ $t('header.solution') }}</a>
          <a href="#4">{{ $t('header.offers') }}</a>
          <a href="#5">{{ $t('header.community') }}</a>
        </nav>
      </div>
      <button>
        <img
          src="@/assets/images/cartBlack.svg"
          alt="Cart button"
          v-if="!dark"
        />
        <img src="@/assets/images/cartWhite.svg" alt="Cart button" v-else />
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      dark: false,
    }
  },
  mounted() {
    this.dark = this.$route.name.includes('reveal')
  },
}
</script>

<style>
header {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.0117188) 99.99%,
    rgba(255, 255, 255, 0.04) 100%
  );
  backdrop-filter: blur(18px);
}
nav a:hover {
  text-decoration: underline;
  text-underline-offset: 6px;
}
</style>
