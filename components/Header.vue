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
          <a href="#1" class="nav-link">{{ $t('header.realisations') }}</a>
          <a href="#2" class="nav-link">{{ $t('header.values') }}</a>
          <a href="#3" class="nav-link">{{ $t('header.solution') }}</a>
          <a href="#4" class="nav-link">{{ $t('header.offers') }}</a>
          <a href="#5" class="nav-link">{{ $t('header.community') }}</a>
        </nav>
      </div>
      <button class="neue rounded-full px-4 py-2">
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

<style scoped>
header {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.0117188) 99.99%,
    rgba(255, 255, 255, 0.04) 100%
  );
  backdrop-filter: blur(18px);
}
.neue {
  box-shadow: -3px -5px 17px rgba(255, 255, 255, 0.87),
    9px 25.03px 30px rgba(110, 163, 242, 0.38);
  /* backdrop-filter: blur(40px); */
}
.neue:hover {
  background: rgba(229, 230, 230, 0.64);
  box-shadow: inset 1.82px 7.41px 12.62px rgba(15, 84, 228, 0.34),
    inset -2px -3px 6px rgba(255, 255, 255, 0.8);
}

.nav-link {
  display: inline-block;
}


.nav-link:after {
  display: block;
  content: '';
  border-bottom: solid 1px black;
  transform: scaleX(0);
  border-radius: 10px;
  transition: transform 250ms ease-in-out;
  transform-origin: 100% 50%;
}

.reveal .nav-link::after {
  border-bottom: solid 1px white;
}

.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: 0% 50%;
  }
</style>
