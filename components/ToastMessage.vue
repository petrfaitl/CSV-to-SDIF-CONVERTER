<script lang="ts" setup>
import { useTimeout } from "@vueuse/core";
const props = defineProps({
  message: {
    type: String,
    default: "",
  },
  duration: {
    type: Number,
    default: 1500,
  },
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["hide"]);

const { message, duration, isVisible } = toRefs(props);
const { ready, start } = useTimeout(duration.value, { controls: true });

watch(isVisible, () => {
  start();
});

watch(ready, () => {
  if (ready.value && isVisible) {
    emit("hide");
  }
});
</script>

<template>
  <Transition name="fade" :duration="150">
    <div
      v-show="isVisible"
      class="absolute bg-primary px-2.5 -top-16 py-3 min-w-[50px] min-h-[30px] leading-3 w-auto rounded-lg translate-x-1/2 right-1/2"
    >
      <div class="relative">
        {{ message }}
      </div>
      <div class="triangle absolute left-1/2 -translate-x-1/2"></div>
    </div>
  </Transition>
</template>

<style scoped>
.triangle {
  @apply w-0 h-0 border-y-primary border-x-transparent border-l-8 border-r-8 border-t-8 border-b-0 -bottom-2;
}

.fade-enter-active,
.fade-leave-active {
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
