<template>
    <div class="flex flex-col items-center justify-between
                w-full max-w-md mx-auto 
                mt-7 p-4 rounded-xl bg-gray-700/25
                border-1 border-gray-500/50">
        <div class="flex gap-2">
            <img src="@/assets/icons/wind.svg"/> 
            <h2 class="text-lg text-gray-500/75 ">
                WIND
            </h2>
        </div>
        <div class="flex flex-col items-center pt-4 w-34">
            <div class="relative w-21 h-21 
                        border-2 border-gray-400 rounded-full 
                        flex items-center justify-center">
                
                <div
                    class="absolute border h-12"
                    :style="{ transform: `rotate(${rotation}deg)` }"
                ></div>
                <span class="absolute top-0 text-xs">N</span>
                <span class="absolute bottom-0 text-xs">S</span>
                <span class="absolute left-0 text-xs">W</span>
                <span class="absolute right-0 text-xs">E</span>
            </div>
            <p class="mt-2 text-sm">{{ windSpeed }}м/с</p>
        </div>
    </div>
</template>

<script setup>
    import { computed } from "vue";

    const props = defineProps({
    windSpeed: { type: Number, required: true },
    windDir: { type: String, required: true }
    });

    // сопоставляем направление с углом
    const dirMap = {
    n: 0,
    ne: 45,
    e: 90,
    se: 135,
    s: 180,
    sw: 225,
    w: 270,
    nw: 315
    };

    const rotation = computed(() => dirMap[props.windDir] ?? 0);
</script>