<script lang="ts" setup>
import { useSlots } from "vue";
import { ClipboardDocumentIcon } from "@heroicons/vue/24/outline";

const slots = useSlots();

const props = defineProps({
  border: {
    type: String,
    default: "wide",
  },
  height:{
    type: String,
    default: "high"
  },
  spacing: {
    type: String,
    default: "wide",
  },
  output: {
    type: String,
    default: "",
  }
});

const { output } = toRefs(props);
const isVisible = ref(false);

const copyOutput = () => {
  isVisible.value = true;
  navigator.clipboard.writeText(output.value);
};

const hideToast = () => {
  isVisible.value = false;
};
</script>

<template>
  <div
    class="relative rounded-lg border-white bg-neutral-900/80 text-neutral-50"
    :class="`border-${border} height-${height}`"
  >
    <div
      class="absolute top-2.5 md:top-3 right-3 w-3 h-3 md:w-6 md:h-6 cursor-pointer"
    >
      <div class="relative">
        <ClipboardDocumentIcon class="text-white" @click="copyOutput" />
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
    <div class="text-xs overflow-x-auto py-2 md:py-4 md:px-4">
      <pre data-language="text/plain"><code id="outputArea">{{output}}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.border-wide {
  @apply border-[6px] md:border-[10px];
}
.border-none{
  @apply border-0;
}
.border-thin {
  border-width: 1px;
}
.border-medium {
  @apply border-2;
}

.height-high {
  height: calc(100% - 53px);
  @apply min-h-[250px];
}
.height-just {
  height: auto;

}

</style>
