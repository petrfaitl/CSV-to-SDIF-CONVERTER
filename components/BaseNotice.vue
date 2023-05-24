<script lang="ts" setup>
  import {FormKitIcon} from "@formkit/vue";

  const slots = useSlots();
  const props = defineProps({
    border: {
      type: String,
      default: 'wide'
    },
    dismissible:{
      type: Boolean,
      default: false
    },
    spacing:{
      type: String,
      default:'wide',
    }
  })
</script>

<template>
  <div class="relative px-4 md:px-12 py-2 md:py-8 rounded  border-white bg-primary/80 text-neutral-50" :class="`border-${border}`">
    <div v-show="dismissible" class="absolute top-2.5 md:top-3 right-3 w-3 h-3 md:w-6 md:h-6 cursor-pointer"><FormKitIcon icon="close" class="text-white"/></div>
    <div v-if="slots.title">
      <h3 class="text-lg font-semibold mb-4">
        <slot name="title"/>

      </h3>
    </div>
    <p class="text-sm">
      <slot name="text" />
    </p>
  </div>
</template>

<style scoped>
.border-wide {
  @apply border-[6px] md:border-[10px];
}

.border-thin {
  @apply border-2;
}

</style>
