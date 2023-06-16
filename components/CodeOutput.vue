<script lang="ts" setup>
import { FormKitIcon } from "@formkit/vue";
import { useSlots, useAttrs } from "vue";

const slots = useSlots();

const props = defineProps({
  border: {
    type: String,
    default: "wide",
  },
  spacing: {
    type: String,
    default: "wide",
  },
  output: {
    type: String,
    default: "",
  },
});

const { output } = toRefs(props);
const isVisible = ref(false);

const copyOutput = () => {
  console.log(output.value);
  isVisible.value = true;
  navigator.clipboard.writeText(output.value);
};

const hideToast = () => {
  isVisible.value = false;
};
</script>

<template>
  <div
    class="relative min-h-[250px] rounded-lg border-white bg-neutral-900/80 text-neutral-50"
    :class="`border-${border}`"
  >
    <div
      class="absolute top-2.5 md:top-3 right-3 w-3 h-3 md:w-6 md:h-6 cursor-pointer"
    >
      <div class="relative">
        <FormKitIcon icon="share" class="text-white" @click="copyOutput" />
        <ToastMessage
          :isVisible="isVisible"
          message="Copied!"
          @hide="hideToast"
        />
      </div>
    </div>
    <div
      class="bg-neutral-800/80 px-4 md:px-12 py-3 rounded-t-lg border-b border-neutral-900"
    >
      <h3 class="text-lg font-semibold">
        <slot name="title" v-if="slots.title" />
      </h3>
    </div>
    <div class="text-xs overflow-x-auto output-h py-2 md:py-8 md:px-2">
      <pre data-language="text/plain"><code >{{output}}</code></pre>
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

.output-h {
  height: calc(100% - 53px);
}
</style>
