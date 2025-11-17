<template>
    <div class="flex flex-col items-center
                w-full max-w-md mx-auto
                p-4 mt-5 rounded-xl bg-gray-700/25
                border-1 border-gray-500/50">
        <div class="flex gap-2">
            <img src="@/assets/icons/tablet.svg"/> 
            <h2 class="text-lg">
                10-DAY FORECAST
            </h2>
        </div>
            <div v-if="loading">Загрузка...</div>
            <div v-else-if="error">Ошибочка {{ error.message }}</div>
            <div
            v-else-if="forecast"
                v-for="(day, index) in forecast.forecasts"
                :key="day.date"
                class="w-full max-w-md mx-auto"
            >
                <hr class="border border-gray-500 m-3">
                <div class="flex justify-between px-3 text-xl items-center">
                        <h1>{{ getDayName(day) }}</h1>
                        <div class="flex flex-col items-center">
                            <img
                                :src="`https://yastatic.net/weather/i/icons/funky/dark/${day.parts.day.icon}.svg`"
                                class="w-8 h-8"
                            />
                            <h2 class="text-[#81CFFA]  text-xs">{{ day.parts.day.humidity }}%</h2>
                        </div>
                    <h2>{{ day.parts.day.temp_min }}°</h2>
                    <temp-bar class="max-w-[100px] w-full" mode="forecast" :min="day.temp_min" :max="day.temp_max"/>
                    <h2>{{ day.parts.day.temp_max }}°</h2>
                </div>
            </div>
        </div>
</template>

<script setup>
    import { useWeatherStore } from '@/store/weatherStore';
    import { storeToRefs } from 'pinia';
    import { onMounted } from 'vue';
    import { getCoordsByCity } from '@/services/geoService';
    import TempBar from '@/components/Common-ui/TempBar.vue';
    import Cookie from "js-cookie";


    const props = defineProps( {
        city: {
            type: String,
            required: true
        }
    })

    const locate = "ru-RU";
    const weatherStore = useWeatherStore();
    const {forecast, loading, error} = storeToRefs(weatherStore);
    
    onMounted(async ()=>{
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
        if(lat && lon){
            weatherStore.fetchForecast(lat, lon)
        }else{
            console.warn('В куки нет координат по дефолту Москва')
        }
        console.log(`10-дней: lat:${lat}, lon:${lon} и городу:`, props.city)
    })

    const getDayName = (day) => {
        const d = new Date(day.date);
        return d.toLocaleDateString(locate, {weekday: "short"}).toUpperCase();
    };
</script>