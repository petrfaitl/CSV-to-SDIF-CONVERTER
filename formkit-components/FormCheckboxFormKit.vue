<template>
  <FormKit
    type="checkbox"
    :attrs="context.attrs"
    :classes="{
      option: {
        'bg-primary/50': true,
        'p-2': true,
        group: true,
        'group-checked:ring-blue-500': true,
        'group-checked:border-blue-500': true,
      },
      label: { 'text-white': true, 'peer-checked:text-blue-500': true },
      options: { 'spacing-y-2': true },
      fieldset: { 'w-full': true },
    }"
    :options="context.attrs.options"
  />
</template>

<script setup>
const props = defineProps({
  context: Object,
});

const { context } = toRefs(props);
// console.log(props.context);
</script>

<style scoped></style>
