<script lang="ts" setup>
import MainNav from "~/components/navigation/MainNav.vue";
import TheFooter from "~/components/navigation/TheFooter.vue";
</script>

<template>
  <MainNav />
  <header
    class="bg-header-image object-cover h-[250px] px-8 md:px-12 py-12 bg-gray-500 bg-blend-multiply"
  >
    <h1 class="mx-auto text-white font-extralight uppercase">
      <span class="text-lg block">Meet Manager Entry File</span
      ><span class="text-4xl font-black text-primary"
        >CSV to HY3 CONVERTER</span
      >
    </h1>
    <div class="my-8" v-if="false">
      <BaseNotice>
        <template #title>Please note:</template>
        <template #text
          >Open only for Tumbler 2, Tumbler 3, Skimmer, Cruiser, Laing and
          Drysdale squad only. <br />
          Registered Competitive swimmers to register via
          <a
            href="https://fastlane.swimming.org.nz/login"
            target="_blank"
            class="text-white underline"
            >FastLane</a
          >.
        </template>
      </BaseNotice>
    </div>
  </header>
  <section
    class="min-h-96 px-8 md:px-12 py-12 mx-auto flex justify-center max-w-7xl flex-wrap"
  >
    <ConvertForm />
  </section>
  <TheFooter />
</template>

<style>
body {
  @apply bg-neutral-100 text-neutral-900;
}
</style>
