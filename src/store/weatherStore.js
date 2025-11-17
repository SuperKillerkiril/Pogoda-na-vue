import { defineStore } from "pinia";
import { getForecast } from "@/services/weatherService";

export const useWeatherStore = defineStore('weather', {
    state: () => ({
        forecast: null,
        loading: false,
        error: null,
        cityName: null
    }),
    actions: {
        async fetchForecast(lat, lon){
            this.loading = true;
            try{
                const data = await getForecast(lat,lon,3);
                this.forecast = data;

                if (data?.geo_object?.locality.name) {
                    this.cityName = data.geo_object.locality.name;
                }
                else{
                    this.cityName = "My Location" //ибо все у чего нет имени можно назвать кузнецк следуя логики обратных док-в при имя города != null
                }
            }
            catch(e){
                this.error = e;
            }finally{
                this.loading = false;
            }
        }
    }
})