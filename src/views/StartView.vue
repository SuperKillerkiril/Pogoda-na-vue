
<template>
    <div class="p-7 bg-black h-screen" v-if="!LocationSaved"> 
    <h1 class="text-4xl">Weather</h1>
    <p>Добро пожаловать в веб-приложение для просмотра погоды.</p>
        <div class="choose-location">
            <p>
                Разрешите доступ к вашему местоположению, что бы показать актуальную погоду
            </p>
            <button class="m-7" @click="getLocation">
                Определить местоположение
            </button>
        </div>
    </div>

</template>

<script>
    import Cookies from 'js-cookie';

    export default{
    data(){
        return {
        LocationSaved: false
        };
    },
    methods:{
        getLocation(){
        navigator.geolocation.getCurrentPosition(
            position => {
            const {latitude, longitude} = position.coords;
            Cookies.set("userLocation", `${latitude},${longitude}`, {expires: 7});;
            this.LocationSaved = true;
            this.$emit('location-set', { latitude, longitude});
            },
            error=>{
            alert('Неудалось получить местоположение');
            console.error(error);
            }
        )
        },
        mouted(){
        const savedLocation = Cookies.get("userLocation");
        if(savedLocation){
            this.locationSet = true;
            const [latitude, longitude] = savedLocation.split(",");
            this.$emit("location-set",{
            latitude: parsedFloat(latitude),
            longitude: parseFloat(longitude)
            })
        }
        }
    }
    }
</script>

<style scoped>
    h1{
    font-weight: bold;
    }
    p{
    color: #8d8d92;
    }
    .choose-location{
    height: 340px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    }
    .choose-location p{
    color: white;
    }
    .choose-location button{
    padding: 10px;
    background-color: white;
    font-weight: bold;
    border-radius: 16px;
    width: 75%;
    transition: 0.5s;
    color: black;
    }
    .choose-location button:hover{
        background-color: lightgrey;
        width: 80%;
    }
    @media (min-width: 1280px) {
        .choose-location{
            height: 65vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .choose-location button{
            padding: 10px;
            background-color: white;
            font-weight: bold;
            border-radius: 16px;
            width: 45%;
            font-size: 15pt;
        }  
        .choose-location p{
            font-size: 18pt;
        }
    }
</style>