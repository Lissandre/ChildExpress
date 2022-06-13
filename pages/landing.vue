<template>
  <div class="container">
    <div id="1" class="h-screen flex flex-col items-center justify-center">
      <div>
        <h1 class="font-bold text-8xl mb-10">
          Faites de <span class="text-pink">votre enfant</span><br />
          la meilleure version<br />
          de vous même
        </h1>
        <div class="w-full flex justify-between">
          <div class="block flex flex-col justify-between items-start">
            <span class="font-light text-2xl">Faciliter la grossesse, c’est notre raison d’être, notre ADN.</span>
            <a href="" class="font-bold text-4xl px-8 py-4 rounded-full neue">Je crée mon enfant</a>
          </div>
          <div class="h-48 w-48 flex justify-center items-center rounded-full overflow-hidden limited neue">
            <span class="block">Offre limitée !</span>
          </div>
        </div>
      </div>
    </div>
    <div id="2" class="h-screen flex flex-col items-center justify-center">
      <h2 class="text-7xl font-bold">Nos réalisations</h2>
      <div class="flex gap-4 justify-center m-24">
        <div class="w-[19%] flex flex-col items-center">
          <span class="name px-4 py-2 uppercase">Name</span>
          <img src="@/assets/images/baby_1.jpg" alt="" class="rounded-md">
        </div>
        <div class="w-[19%] flex flex-col items-center">
          <span class="name px-4 py-2 uppercase">Name</span>
          <img src="@/assets/images/baby_2.jpg" alt="" class="rounded-md">
        </div>
        <div class="w-[19%] flex flex-col items-center">
          <span class="name px-4 py-2 uppercase">Name</span>
          <img src="@/assets/images/baby_3.jpg" alt="" class="rounded-md">
        </div>
        <div class="w-[19%] flex flex-col items-center">
          <span class="name px-4 py-2 uppercase">Name</span>
          <img src="@/assets/images/baby_4.jpg" alt="" class="rounded-md">
        </div>
        <div class="w-[19%] flex flex-col items-center relative">
          <span class="name px-4 py-2 uppercase">Name</span>
          <img src="@/assets/images/baby_5.jpg" alt="" class="rounded-md">
          <img src="@/assets/images/flames.png" alt="" class="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 h-2/3">
        </div>
      </div>
      <a href="" class="font-bold text-4xl px-8 py-4 rounded-full neue">Je veux le mien</a>
    </div>
    <div id="3" class="h-screen flex flex-col items-center justify-center">
      <h2 class="text-7xl font-bold">Nos valeurs</h2>
      <div class="flex gap-4 justify-center m-24">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <a href="" class="font-bold text-4xl px-8 py-4 rounded-full neue">En savoir plus</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Landing',
  layout: 'landing',
  nuxtI18n: {
    paths: {
      en: '/',
      fr: '/',
    },
  },
}
</script>

<style scoped>
h1 span {
  display: inline-block;
  transform: rotate(-2.6deg);
}

.name {
  display: inline-block;
  transform: rotate(-4.6deg) translateY(30%);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #1D1D1B;
  backdrop-filter: blur(29px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 11px;
}

.neue {
  box-shadow: -3px -5px 17px rgba(255, 255, 255, 0.87), 9px 25.03px 30px rgba(110, 163, 242, 0.38);
  backdrop-filter: blur(40px);
}

a.neue, button.neue {
  background: rgba(229, 230, 230, 0.31);
}

.limited {
  box-shadow: inset 0px 11.638px 25.55px rgba(255, 255, 255, 0.73), inset -5.81898px -4.65518px 17.49px rgba(255, 255, 255, 0.71), -3px -5px 17px rgba(255, 255, 255, 0.87), 9px 25.03px 30px rgba(110, 163, 242, 0.38);
  backdrop-filter: blur(40px);
  background: rgba(190, 206, 225, 0.45);
}
</style>
