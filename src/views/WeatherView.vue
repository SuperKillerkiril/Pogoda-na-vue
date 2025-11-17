<template>
    <div class="bg-[#2b3142]">
        <div 
            class="bg-fixed weather-view relative min-h-screen transition-all duration-1000 else-in-out"
            :style="backgroundStyle"
        >
                <div class="bg-fixed bg-gradient-to-t from-[#2b3142] via-[#2b3142] to-[#2b3142]/50 
                            pointer-events-none">
                    <div>
                        <Header class="w-full"
                            :class="scrolled? 'scale-95 opacity-100':'scale-100 opacity-100'"
                            :city="city"
                            :scrolled="scrolled"
                            ></Header>
                        <div class="px-7 z-2">
                            <section>
                                <hourly-prediction :city="city"/>
                            </section>
                            <section>
                                <TenDaysForecast :city="city"></TenDaysForecast>
                            </section>
                            <section>
                                <AirQuality v-if="forecast?.fact"
                                :humidity="forecast.fact.humidity"
                                :windSpeed="forecast.fact.wind_speed"
                                :condition="forecast.fact.condition"
                                />
                            </section>  
                            <section class="grid grid-cols-2 sm:grid-cols-1 gap-4">
                                <WindCompass v-if="forecast?.fact"
                                :windSpeed="forecast.fact.wind_speed"
                                :windDir="forecast.fact.wind_dir"                        
                                />
                                <Rainfall
                                :city="city"    
                                />
                                <FeelsLike v-if="forecast?.fact"
                                :temp="forecast.fact.temp"
                                :feelsLike="forecast.fact.feels_like"
                                />
                                <Humidity v-if="forecast?.fact"
                                :temp="forecast.fact.temp"
                                :humidity="forecast.fact.humidity"
                                />
                            </section>
                            <section class="relative z-0">
                                <Location v-if="forecast?.fact"
                                :lat="forecast.info.lat"
                                :lon="forecast.info.lon"
                                :city="city"
                                />
                            </section>
                    </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
    import {ref, onMounted, onUnmounted, watch, computed} from "vue";
    import { useRoute } from 'vue-router';
    import { storeToRefs } from 'pinia';
    import Cookie from "js-cookie";
    import { getCoordsByCity } from '@/services/geoService';
    import { useWeatherStore } from '@/store/weatherStore';
    import HourlyPrediction from '@/components/Features/HourlyPrediction.vue';
    import TenDaysForecast from '@/components/Features/TenDaysForecast.vue';
    import AirQuality from '@/components/Features/AirQuality.vue';
    import WindCompass from '@/components/Features/WindCompass.vue';
    import Header from '@/components/Features/Header.vue';
    import Rainfall from '@/components/Features/Rainfall.vue';
    import FeelsLike from '@/components/Features/FeelsLike.vue';
    import Humidity from '@/components/Features/Humidity.vue';
    import SunCycle from '@/components/Features/SunCycle.vue';
    import Location from "@/components/Features/Location/Location.vue";

    export default{
        components:{
            HourlyPrediction,
            TenDaysForecast,
            AirQuality,
            Header,
            WindCompass,
            Rainfall,
            FeelsLike,
            Humidity,
            SunCycle,
            Location
        },
        setup(){
            const scrolled = ref(false);
            const router = useRoute();
            const city = router.params.city ? decodeURIComponent(router.params.city) : "Неизвестно";
            const weatherStore = useWeatherStore();
            const {forecast} = storeToRefs(weatherStore);
            const currentTime = ref("");
            const currentBackground = ref("");
            const backgroundMap={
                clear: "url('/background/clear.png')",
                cloudy: "url('/background/cloudy.png')",
                "partly-cloudy": "url('/background/cloudy.png')",
                overcast: "url('/background/cloudy.png')",
                "light-rain": "url('/background/rain.png')",
                rain: "url('/background/rain.png')",
                "heavy-rain": "url('/background/rain.png')",
                showers:"url('/background/rain.png')",
                "wet-snow": "url('/background/snow.png')",
                snow: "url('/background/snow.png')",
                "light-snow":"url('/background/snow.png')",
                "snow-showers": "url('/background/snow.png')",
            }

            watch(forecast, (newVal)=> {
                if(newVal?.fact?.condition){
                    const condition = newVal.fact.condition;
                    currentBackground.value = backgroundMap[condition]|| "url('/background/clear.png')"
                }
            });

            const backgroundStyle = computed(()=>({
                backgroundImage: currentBackground.value,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }));

            const handleScroll = () => {
                requestAnimationFrame(()=>{
                scrolled.value = window.scrollY > 1; 
                })
            };

            onMounted(async () => {
                window.addEventListener("scroll", handleScroll);

                const now = new Date();
                const h = String(now.getHours()).padStart(2, "0");
                const m = String(now.getMinutes()).padStart(2, "0");
                currentTime.value = `${h}:${m}`;

                let lat, lon;
                const savedLocation = Cookie.get("userLocation");
                    
                if (city === "My Location" && savedLocation) {
                    const [latitude, longitude] = savedLocation.split(",");
                    lat = parseFloat(latitude);
                    lon = parseFloat(longitude);                    
                }else{
                    const coords = await getCoordsByCity(city);
                    if(coords){
                        lat = coords.lat
                        lon = coords.lon
                    } else{
                        lan = 55.75;
                        lon = 37.61;
                    }
                }
                if(lat && lon){
                    weatherStore.fetchForecast(lat, lon)
                    console.log(`Ищем в главном ком-те по координатам: ${lon}, ${lat} и городу:`, city)
                }else{
                    console.warm('В куки нет координат по дефолту Москва')
                }
            });
            onUnmounted(() => {
                window.removeEventListener("scroll", handleScroll);
            });
            return {scrolled, city, forecast, backgroundStyle}
        }
    }
</script>
<style scoped>
.background-test{
  background: url(@/assets/sky.jpg) no-repeat;
}
.background-test2{
  background: linear-gradient(to bottom, #12192375, #2b3142);
}
</style>