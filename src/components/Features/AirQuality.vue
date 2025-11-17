<template>
    <div class="flex flex-col items-center
                w-full  mx-auto
                p-4 mt-5 rounded-xl bg-gray-700/25
                border-1 border-gray-500/50">
        <div class="flex gap-2">
            <img src="@/assets/icons/air.svg"/> 
            <h2 class="text-lg text-gray-500/75">
                AIR QUALITY
            </h2>
        </div>
            <h3 class="text-2xl pt-3 mx-3 w-full ">
                {{ quality }} - {{ qualityLabel }}
            </h3>
            <span class="text-lg font-light m-3 w-full ">
                {{ advice }}
            </span>
            <div>
                
            </div>
            <hr class="border border-gray-500
                    m-3 w-full ">
            <button class="text-left text-lg
                    m-3 w-full 
                    flex justify-between items-center">
                See More 
                <img class="size-4" src="@/assets/icons/ch.svg" />
            </button>
    </div>
</template>

<script setup>
import { computed } from "vue";

    const props = defineProps({
        humidity: { type: Number, required: true },
        windSpeed: { type: Number, required: true },
        condition: { type: String, required: true }
    });

    const qualityLabel = computed(() => {
        if (props.windSpeed < 1 && props.humidity > 80) return "Плохое";
        if (props.windSpeed < 3 && props.humidity > 60) return "Среднее";
        return "Хорошее";
    });
    const quality = computed(() => {
        if (props.windSpeed < 1 && props.humidity > 80) return "10";
        if (props.windSpeed < 3 && props.humidity > 60) return "50";
        return "100";
    });


    const advice = computed(() => {
        if (qualityLabel.value === "Хорошее")
            return "Воздух чистый, можно гулять и заниматься спортом без ограничений.";
        if (qualityLabel.value === "Среднее")
            return "Качество воздуха среднее, чувствительные люди могут ощущать лёгкий дискомфорт.";
        return "Воздух тяжёлый, лучше сократить время на улице и проветривать помещение.";
    });
</script>