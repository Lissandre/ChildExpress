<template>
  <header class="fixed top-0 w-full">
    <div class="container flex justify-between py-4 px-8">
      <div class="flex items-center gap-8">
        <img src="@/assets/images/logoChildExpressBlack.svg" alt="Logo ChildExpress">
        <nav class="flex gap-8">
          <a href="#1">Nos réalisations</a>
          <a href="#2">Nos valeurs</a>
          <a href="#3">Notre solution</a>
          <a href="#4">Nos offres</a>
          <a href="#5">Child Community</a>
        </nav>
      </div>
      <button>
        <img src="@/assets/images/cartBlack.svg" alt="Cart button">
      </button>
    </div>
    
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>