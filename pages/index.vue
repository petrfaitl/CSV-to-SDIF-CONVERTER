<script lang="ts" setup>
import MainNav from "~/components/navigation/MainNav.vue";
import TheFooter from "~/components/navigation/TheFooter.vue";
import { version } from "@/package.json";
import SampleData from "~/components/SampleData.vue";
</script>

<template>
  <MainNav />
  <header
    class="bg-header-image object-cover h-[250px] px-8 md:px-12 py-12 bg-gray-500 bg-blend-multiply"
  >
    <h1 class="mx-auto text-white font-extralight uppercase">
      <span class="text-lg block">Meet Manager Entry File</span
      ><span class="text-4xl font-black text-primary"
        >CSV to SDIF CONVERTER</span
      >
    </h1>
    <span class="text-xs text-white">Version {{ version }}</span>
    <div class="my-8" v-if="true">
      <h1 class="font-medium mb-2 text-white w-full mb-12">
        Using the converter
        <span>
          <ToolTip border="thin" dismissible>
            <template #title>Tip</template>
            <template #text>
              <p class="mb-2">
                Open the downloaded csv file in a plain text editor (i.e.
                Notepad, TextEdit) not MS Word.
              </p>
              <p class="mb-2">
                Select all contents, press copy and paste them to the input
                below.
              </p>
            </template>
          </ToolTip>
        </span>
      </h1>
    </div>
  </header>
  <section
    class="min-h-96 px-8 md:px-12 py-12 mx-auto flex flex-col content-center items-center max-w-7xl"
  >
    <ConvertForm />
  </section>
  <section
  class="bg-gray-900">
    <SampleData />
  </section>
  <TheFooter />
</template>

<style>
body {
  @apply bg-neutral-100 text-neutral-900;
}
</style>
