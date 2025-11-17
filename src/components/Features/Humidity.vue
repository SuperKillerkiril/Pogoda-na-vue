<template>
    <div class="flex flex-col justify-between
                w-full max-w-md mx-auto
                p-4 mt-5 rounded-xl bg-gray-700/25
                border-1 border-gray-500/50 min-h-45
                sm:min-h-25">
       
            <div class="flex gap-2">
                <img src="@/assets/icons/humindity.svg"/> 
                <h2 class="text-lg text-gray-500/75 ">
                    HUMINDITY
                </h2>
            </div>
            
            <div class="flex flex-col justify-between
                        w-full max-w-md mx-auto
                        h-full max-h-lg">
                <h2 class="text-4xl">{{ humidity }}%</h2>
                <p class="text-lg">The dew point is {{devPoint}}° right now.</p>
            </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

    const props = defineProps({
        humidity: { type: Number, required: true },
        temp:{ type: Number, required: true }
    });

    const devPoint = computed(() => {
        const a = 17.27;
        const b = 237.7;
        const alpha = (a*props.temp) / (b+props.temp) + Math.log(props.humidity / 100);
        return +(b * alpha/(a - alpha)).toFixed(1);
    })

</script>