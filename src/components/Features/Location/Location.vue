<template>
<div class="w-full max-w-4xl mx-auto
            mt-7 p-4 rounded-xl bg-gray-700/25
            border-1 border-gray-500/50">

    <div id="map" class="w-full h-64 rounded-xl overflow-hidden Z-19"></div>
  </div>
</template>

<script setup>
    import { nextTick, onMounted, ref, watch } from "vue";
    import L from "leaflet";
    import "leaflet/dist/leaflet.css";

    const props = defineProps({
        lat: { type: Number, required: true },
        lon: { type: Number, required: true },
        city: { type: String, required: true }
    });

    const map = ref(null);
    const marker = ref(null);
    const markerIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    onMounted(async() => {
        await nextTick();

        map.value = L.map("map").setView([props.lat, props.lon], 10);
        
    
        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map.value);

        marker.value = L.marker([props.lat, props.lon], { icon: markerIcon }).addTo(map.value).bindPopup(props.city).openPopup();

    });
    watch(()=>[props.lat, props.lon, props.city], ([newLat, newLon, newCity])=>{
        if(map.value){
            map.value.setView([newLat, newLon], 10);
        }else{
            marker.value = L.marker([newLat, newLon]).addTo(map.value).bindPopup(newCity).openPopup();
        }
    });

</script>

<style>
#map {
  height: 300px;
  width: 100%;
}
</style>