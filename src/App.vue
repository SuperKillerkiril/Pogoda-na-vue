

<template>
  <div id="app">
    <div>
          <location-prompt v-if="!locationSet" @location-set="handleLocation"/>
          <div v-else>
            <router-view/>
            <bottom-nav/>
          </div>
    </div>
  </div>
</template>

<script>
  import LocationPrompt from './views/StartView.vue';
  import BottomNav from './components/Layout/MainLayout.vue';
  import Cookies from 'js-cookie';

  export default{
    name: 'App',
    components: {
      LocationPrompt,
      BottomNav
    },
    data(){
      return{
        locationSet: false
      };
    },
    methods:{
      handleLocation({latitude, longitude}){
        console.log(`Получено местоположение: lat:${latitude} lon:${longitude} `);
        this.locationSet = true;
        Cookies.set("userLocation", `${latitude},${longitude}`, {expires: 7});
      },
    },
    mounted(){
      const savedLocation = Cookies.get("userLocation");
      if(savedLocation){
        this.locationSet = true;
        const [latitude, longitude] = savedLocation.split(",");
        this.$emit("location-set",{
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude)
        })
      }
    }
  }//Есть запросы в хедере, 10 дней погоды, почасовом предикте, 
</script>