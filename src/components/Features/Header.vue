<template>
    <header class="sticky top-0 z-20 transition-all duration-300 "
                    :class="scrolled? 'backdrop-blur pb-3' : ''"
                >
                <div class=" flex flex-col justify-items-center items-center pt-7">
                    <h1 class="text-4xl" >
                        {{ props.city ==='My Location' ? weatherStore.cityName || 'My Location' : props.city}}
                    </h1>
                    <div v-if="weatherStore.forecast" :class="scrolled ? 'flex' : '' ">
                            <h2 :class="scrolled? 'text-2xl font-thin text-center ' : 'text-8xl font-thin text-center'">
                                {{ weatherStore.forecast.fact.temp }}°
                            </h2>
                            <div :class="scrolled? 'flex justify-items-center items-center px-3  text-2xl': 'hidden '">
                                |
                            </div>
                            <h3 class="text-2xl font-thin ">
                                {{ formatCondition(weatherStore.forecast.fact.condition) }}
                            </h3>
                    </div>
                    <div v-if="weatherStore.forecast" :class="scrolled? 'hidden': 'flex gap-4 pt-2'">
                        <h3  class="text-2xl">
                            H:{{ weatherStore.forecast.forecasts[0].parts.day.temp_max }}°
                        </h3>
                        <h3 class="text-2xl">
                            L:{{ weatherStore.forecast.forecasts[0].parts.day.temp_min }}°
                        </h3>
                    </div>
                </div>
        </header>
</template>
<script setup>
    import { useWeatherStore } from '@/store/weatherStore';
    import {ref, onMounted, onUnmounted} from "vue";
    import { getCoordsByCity } from '@/services/geoService';
    import Cookie from "js-cookie";

        const props = defineProps({
            city: {
                type: String,
                required: true
            },
            scrolled:{
                type: Boolean,
                default: false
            }
        })

        const weatherStore = useWeatherStore();

        onMounted(async () => {
            let lat, lon;
            const savedLocation = Cookie.get("userLocation");
                
            if (props.city === "My Location" && savedLocation) {
                const [latitude, longitude] = savedLocation.split(",");
                lat = parseFloat(latitude);
                lon = parseFloat(longitude);                    
            }else{
                const coords = await getCoordsByCity(props.city);
                if(coords){
                    lat = coords.lat
                    lon = coords.lon
                } else{
                    lan = 55.75;
                    lon = 37.61;
                    props.city = "Москва"
                }
            }
            if(lat && lon){
                weatherStore.fetchForecast(lat, lon)
                console.log(`Ищем в Хедере по координатам: lat:${lat}, lon:${lon} и городу:`, props.city)
            }else{
                console.warm('В куки нет координат по дефолту Москва')
            }
        });

        function formatCondition(condition) {
            if(typeof condition!== "string") return"";
            const norm =  condition.replace(/-/g, " ");
            return norm.charAt(0).toUpperCase()+norm.slice(1);
        };
</script>