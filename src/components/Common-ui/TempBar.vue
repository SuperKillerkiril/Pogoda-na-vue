<template>
  <div class="w-full flex flex-col items-center">
    <div class="relative w-full h-1 rounded-full overflow-hidden bg-gradient-to-r from-green-400 via-yellow-400 to-red-500">
      <div
        class="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-md"
        :style="{ left: indicatorPosition + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  mode: { type: String, default: "temperature" }, // "temperature" "forecast" "air"
  value: { type: Number, default: 0 }, // фактическая температура или качество воздуха
  min: { type: Number, default: 0 },   
  max: { type: Number, default: 100 }, 
});

const indicatorPosition = computed(() => {
  if (props.mode === "temperature") {
    const range = props.max - props.min;
    if (range <= 0) return 50;
    return ((props.value - props.min) / range) * 100;
  }
  if (props.mode === "forecast") {
    return 50; 
  }
  if (props.mode === "air") {
    const clamped = Math.min(Math.max(props.value, 0), 500);
    return (clamped / 500) * 100;
  }
  return 50;
});
</script>