import axios from "axios";

const GEOCODER_URL ="https://geocode-maps.yandex.ru/v1/";
const GEOCODER_KEY ="9fb2a0be-5881-4825-9664-32214927fce0";

export async function getCoordsByCity(cityName) {
    try{
        const {data} = await axios.get(GEOCODER_URL, {
            params:{
                apikey: GEOCODER_KEY,
                format: "json",
                geocode: cityName
            }
        });
        const pos = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
        const [lon, lat] = pos.split(" ").map(parseFloat);
        return {lon, lat};
    }catch(e){
        console.error("Геокодер:", e)
        return null;
    }
    
}