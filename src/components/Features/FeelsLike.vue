<template>
    <div class="flex flex-col justify-between
                w-full  mx-auto
                mt-7 p-4 rounded-xl bg-gray-700/25
                border-1 border-gray-500/50 min-h-45
                sm:min-h-25">

        <div class="flex gap-2">
            <img src="@/assets/icons/thermometer.svg"/> 
            <h2 class="text-lg text-gray-500/75 ">
                FEELS LIKE
            </h2>
        </div>
        
        <div class="flex flex-col justify-between
                        w-full  mx-auto
                        h-full max-h-lg">
            <h2 class="text-4xl">{{ feelsLike }}°</h2>
            <p class="text-lg">{{ advice }}</p>
        </div>
    </div>
</template>
<script setup>
    import { computed } from "vue";

    const props = defineProps({
        temp: { type: Number, required: true },       
        feelsLike: { type: Number, required: true }  
    });

    const difference = computed(() => props.feelsLike - props.temp);

    const advice = computed(()=>{
        if(difference.value === 0){
            return "Ощущается так же, как фактическая"
        }else if(difference.value > 0){
            return `Ощущается теплее на ${difference.value}°`
        }else{
            return `Ощущается холоднее на ${Math.abs(difference.value)}°`
        }
    })
</script>