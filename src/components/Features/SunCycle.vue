<template>
      <div class="flex flex-col justify-between
                    w-full max-w-md mx-auto
                    p-4 mt-5 rounded-xl bg-gray-700/25
                    border-1 border-gray-500/50 min-h-35">

        <div class="flex gap-2">
            <img src="@/assets/icons/raindrops.svg"/> 
            <h2 class="text-lg text-gray-500/75 ">
                SUNRISE
            </h2>
        </div>
    <p class="text-sm">🌅 Sunrise: {{ sunrise }}</p>
    <p class="text-sm">🌇 Sunset: {{ sunset }}</p>

    <svg viewBox="0 0 100 50" class="w-full h-24 mt-4">
      
      <path d="M 0 50 Q 50 -20 100 50" stroke="orange" stroke-width="2" fill="none" />

      <circle
        :cx="currentX"
        :cy="currentY"
        r="3"
        fill="red"
      />
    </svg>
  </div>
</template>

<script setup>
import { computed } from "vue";

    const props = defineProps({
        sunrise: { type: String, required: true },
        sunset: { type: String, required: true },
        now: { type: String, required: true } 
    });

    function toMinutes(t) {
        const [h, m] = t.split(":").map(Number);
        return h * 60 + m;
    }

    const sunriseMin = computed(() => toMinutes(props.sunrise));
    const sunsetMin = computed(() => toMinutes(props.sunset));
    const nowMin = computed(() => toMinutes(props.now));

    const progress = computed(() =>
        (nowMin.value - sunriseMin.value) / (sunsetMin.value - sunriseMin.value)
    );

    const currentX = computed(() => progress.value * 100);
    const currentY = computed(() => {    
        const t = progress.value;
        return 50 - (Math.sin(t * Math.PI) * 40); // синус для дуги 
    });
</script>