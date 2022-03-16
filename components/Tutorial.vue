<template>
  <div
    class="flex items-center justify-center min-h-screen flex-col"
  >
    {{ $t('home.title') }}
    <NuxtLink :to="localePath('/asdf')" class="block uppercase">> go to 404 <</NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'NuxtTutorial',
}
</script>
