<script lang="ts" setup>
  import MainNav from "~/components/navigation/MainNav.vue";
  import TheFooter from "~/components/navigation/TheFooter.vue";


</script>

<template>
  <MainNav/>
  <header class="bg-header-image object-cover h-[500px] px-8 md:px-12 py-12 bg-gray-500 bg-blend-multiply">
    <h1 class="mx-auto text-white font-extralight uppercase">
      <span class="text-lg block">Swim Night</span><span class="text-4xl font-black text-primary">Registration</span>
    </h1>
  </header>
  <div class="h-96"></div>
  <TheFooter/>
</template>

<style>
body {
  @apply bg-neutral-100 text-neutral-900
}
</style>
