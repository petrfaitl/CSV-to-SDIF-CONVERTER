<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
useHead({
  title: "LVWASC CSV TO SDIF Converter",
  meta: [
    {
      name: "description",
      content: "Convert .csv to .sd3 file format for Meet Manager entries",
    },
  ],
  link: [{ rel: "icon", type: "image/png", href: "/images/favicon-32x32.png" }],
});
</script>
