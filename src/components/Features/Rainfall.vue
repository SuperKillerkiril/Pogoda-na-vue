<template>
    <div class="flex flex-col justify-between
                    w-full max-w-md mx-auto
                    p-4 mt-5 rounded-xl bg-gray-700/25
                    border-1 border-gray-500/50">

        <div class="flex gap-2">
            <img src="@/assets/icons/raindrops.svg"/> 
            <h2 class="text-lg text-gray-500/75 ">
                ОСАДКИ
            </h2>
        </div>
        <div class="flex flex-col justify-between
                        w-full max-w-md mx-auto
                        h-full max-h-lg">
            <h2 class="text-4xl">{{ pastRain }} мм </h2>
            <p class="text-2xl">за посл. 24ч</p>
            <p class="text-lg" >{{ futureRain }} мм в следующие 24ч</p>
        </div>
        
    </div>
</template>
<script setup>
    import {ref, onMounted} from "vue";
    import axios from "axios";
    import { getCoordsByCity } from "@/services/geoService";

    const props = defineProps({
        city: {type: String, required: true}
    });

    const pastRain = ref(0);
    const futureRain = ref(0);

    const API_KEY = "2373d829-76b3-4180-b6ae-9c8217ec49a5";
    const WEATHER_URL = "https://api.weather.yandex.ru/v2/forecast";

    onMounted(async () => {
        
    const coords = await getCoordsByCity(props.city);
    const { data } = await axios.get(WEATHER_URL, {
        params: { lat: coords.lat, lon: coords.lon, hours: true, limit: 2 },
        headers: { "X-Yandex-Weather-Key": API_KEY }
    });
    console.log(`В Осадках по координатам: ${coords.lat}, ${coords.lon} и городу:`, props.city)

    const nowHour = new Date().getHours();
    pastRain.value = data.forecasts[0].hours
        .filter(h => parseInt(h.hour) < nowHour)
        .reduce((sum, h) => sum + (h.prec_mm || 0), 0);

    futureRain.value = data.forecasts[0].hours
        .filter(h => parseInt(h.hour) >= nowHour)
        .reduce((sum, h) => sum + (h.prec_mm || 0), 0);
    });
</script>