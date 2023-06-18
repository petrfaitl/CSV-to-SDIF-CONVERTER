<script lang="ts" setup>
import { QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/vue/24/outline";

const slots = useSlots();
const props = defineProps({
  border: {
    type: String,
    default: "wide",
  },
  dismissible: {
    type: Boolean,
    default: false,
  },
  spacing: {
    type: String,
    default: "wide",
  },
});

const show = ref(false);
</script>

<template>
  <div class="relative rounded-full inline-block ms-2 cursor-pointer">
    <div class="flex w-6 h-6 flex-col justify-center">
      <div
        class="w-4 h-4"
        @click="
          {
            show = !show;
          }
        "
      >
        <QuestionMarkCircleIcon class="text-primary" />
      </div>
    </div>

    <div class="absolute z-50 left-8 top-2 shadow-lg">
      <div
        class="relative max-w-2xl w-full min-w-[400px] pe-12 ps-2 py-2 rounded border-white bg-primary text-neutral-50"
        :class="`border-${border}`"
        v-if="show"
      >
        <div
          v-show="dismissible"
          @click="
            {
              show = !show;
            }
          "
          class="absolute top-2.5 md:top-3 right-3 w-3 h-3 md:w-4 md:h-4 cursor-pointer"
        >
          <XMarkIcon class="text-white" />
        </div>
        <div v-if="slots.title">
          <h3 class="text-md font-semibold mb-2">
            <slot name="title" />
          </h3>
        </div>
        <p class="text-xs font-normal">
          <slot name="text" />
        </p>
      </div>
    </div>
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
