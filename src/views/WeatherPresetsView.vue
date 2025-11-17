<template>
    <div class="presets-page p-7 bg-black">
        <div class="pb-4 flex items-center  place-content-between">
            <h1 class="text-4xl font-bold">Weather</h1>
            <button>
                <img src="../assets/icons/menu-button.svg"/>
            </button>
        </div>
         <CityAutocomplete
            :suggestions="cityNames"
            @select="handleCitySelected"
            @clear="handleClear"
        />
        <div class="card-grid pt-5">
            <WeatherCard 
                v-for="city in presetCities"
                :key="city.name"
                :city="city"
            />
        </div>
    </div>
</template>
<script>
import CityAutocomplete from "@/components/CityAutocomplete.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import { ref, computed } from "vue";


  export default {
    components: { CityAutocomplete, WeatherCard },
    setup(){
      const presetCities = ref( [
          { name: "My Location", temp: "21°", time: "9:11 PM", weatherDescription: "Partly Cloudy", highTemp: "H:29°", lowTemp: "L:15°"},
          { name: "Seoul", temp: "34°", time: "9:11 PM", weatherDescription: "Partly Cloudy", highTemp: "H:29°", lowTemp: "L:15°"},
          { name: "London", temp: "18°", time: "7:42 PM", weatherDescription: "Cloudy", highTemp: "H:22°", lowTemp: "L:13°"}
        ]);
      const selectedCity = ref(null);

      const cityNames = computed(()=> presetCities.value.map(c => c.name));

      const displayCities = computed(()=> {
        if (!selectedCity) return presetCities.value;
        return presetCities.value.filter(c=>c.name=== selectedCity.value)
      });

      const handleCitySelected = (cityName) => {
        selectedCity.value = cityName;
      }
      const handleClear=()=>{
        selectedCity.value = null;
      }
      return {presetCities, cityNames, displayCities, handleCitySelected, handleClear};
    }
  };
</script>
<style>
    .card-grid{
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
</style>