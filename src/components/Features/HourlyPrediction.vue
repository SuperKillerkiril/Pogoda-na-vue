<template>
    <div class="flex flex-col items-center
                w-full  mx-auto
                p-4 mt-7 rounded-xl bg-gray-700/25
                border-1 border-gray-500/50">

        <h2 class="text-lg">
            {{ condition }}
        </h2>
        <hr class="border border-gray-500
                    m-3 w-full ">
        <div class="flex justify-between m-3 w-full ">
            <div
                v-for="(hour, index) in hoursData"
                :key="index"
                class="flex flex-col justify-items-center items-center mx-1 "
            >
                <h3 class="text-lg">{{ hour.label }}</h3>
                <img
                    :src="`https://yastatic.net/weather/i/icons/funky/dark/${hour.icon}.svg`"
                    class="w-8 h-8"
                />
                <!-- <span class="text-2xl">{{ getEmoji(hour.condition) }}</span> -->
                <p class="text-2xl">{{ hour.temp }}°</p>
            </div>
        </div>
    </div>
</template>
<script>
    import Cookie from "js-cookie";
    import { ref } from "vue";
    import { onMounted } from "vue";
    import { getCoordsByCity } from '@/services/geoService';

    export default{
        props:{
            city: {
                type: String,
                required: true
            },
        },
            setup(props){

                const hoursData = ref([]);
                const condition = ref("");

                const fetchWeather = async () => {
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
                    
                    const nowCondition = data.fact.condition;

                    const hours = data.forecasts[0].hours;

                    const result = hours.slice(0, 5).map((h, i) => {
                    const hourNum = parseInt(h.hour, 10);
                    const suffix = hourNum >= 12 ? "PM" : "AM";
                    const displayHour = hourNum % 12 || 12;
                    return {
                        label: i === 0 ? "NOW" : `${displayHour} ${suffix}`,
                        temp: h.temp,
                        condition: h.condition,
                        icon: h.icon
                        };
                    });
                    condition.value = nowCondition;
                    hoursData.value = result;

                    console.log(`6ч: lat:${lat}, lon:${lon} и городу:`, props.city)
                }

                onMounted(fetchWeather);

                return {hoursData, condition}
            }
        }
</script>