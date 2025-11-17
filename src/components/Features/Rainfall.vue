<template>
    <div class="flex flex-col justify-between
                    w-full  mx-auto
                    p-4 mt-5 rounded-xl bg-gray-700/25
                    border-1 border-gray-500/50">

        <div class="flex gap-2">
            <img src="@/assets/icons/raindrops.svg"/> 
            <h2 class="text-lg text-gray-500/75 ">
                ОСАДКИ
            </h2>
        </div>
        <div class="flex flex-col justify-between
                        w-full  mx-auto
                        h-full max-h-lg">
            <h2 class="text-4xl">{{ pastRain }} мм </h2>
            <p class="text-2xl">за посл. 24ч</p>
            <p class="text-lg" >{{ futureRain }} мм в следующие 24ч</p>
        </div>
        
    </div>
</template>
<script setup>
    import {ref, onMounted} from "vue";
    import Cookie from "js-cookie";
    import { getCoordsByCity } from "@/services/geoService";

    const props = defineProps({
        city: {type: String, required: true}
    });

    const pastRain = ref(0);
    const futureRain = ref(0);

    onMounted(async () => {
        let lat, lon;

        const savedLocation = Cookie.get("userLocation");
        if (props.city === "My Location" && savedLocation){
            const [latitude, longitude] = savedLocation.split(",");
            lat = latitude;
            lon = longitude;
        }else{
        const coords = await getCoordsByCity(props.city);
            if(coords){
                lat = coords.lat
                lon = coords.lon
            } else{
                lat = 55.75;
                lon = 37.61;
            }
        }
        const accessKey = '2373d829-76b3-4180-b6ae-9c8217ec49a5';
        const response = await fetch(
            `https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${lon}&hours=true&limit=5`,{headers: {'X-Yandex-Weather-Key': accessKey}}
        );
        const data = await response.json();
        console.log(`В Осадках: lat:${lat}, lon:${lon} и городу:`, props.city)
        // console.log(data.forecasts[0].hours[0].prec_mm) оно реально 0 почти всегда, все работает
        const nowHour = new Date().getHours();
        pastRain.value = data.forecasts[0].hours
            .filter(h => parseInt(h.hour) < nowHour)
            .reduce((sum, h) => sum + (h.prec_mm || 0), 0).toFixed(1);

        futureRain.value = data.forecasts[0].hours
            .filter(h => parseInt(h.hour) >= nowHour)
            .reduce((sum, h) => sum + (h.prec_mm || 0), 0).toFixed(1);
    });
</script>