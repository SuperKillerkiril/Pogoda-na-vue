<template>
    <router-link
        v-if="city.name"
        :to="{name: 'WeatherView', params:{city: encodeURIComponent(city.name)}}"
    >
    <div class="rounded-2xl">
        <div class="weather-card bg-gray-700/50 ">
            <div class="left-block">
                <div class="basic-information">
                    <h3 class="font-bold">{{ city.name }}</h3>
                    <p>{{ city.time }}</p>
                </div>
                <span>{{ city.weatherDescription }}</span>
            </div>
            <div class="right-block">
                <h4>
                    {{ city.temp }}
                </h4>
                <div class="higt-low-temp">
                    <span>
                        {{ city.highTemp  }}
                    </span>
                    <span>
                        {{ city.lowTemp  }}
                    </span>
                </div>
            </div>
        </div>
    </div>
    </router-link>
</template>

<script>
    export default{
        props: {
            city: {
                type: Object,
                required: true
            },
        }
    };
</script>

<style scoped>
.weather-card{
    padding: 10px 16px 10px 16px;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    min-height: 117px;
    color: white;
}
.left-block{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 16px;
}
.basic-information{
    margin-bottom: auto;
}
.basic-information p{
    margin: unset;
    font-size: 15px;
}
.basic-information h3{
    font-size: 25px;
    margin: unset;
}
.left-block{
    display: flex;
    flex-direction: column;
    max-width: 70%;
}
.right-block{
    width: 27%;
    text-align: end;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.right-block h4{
    font-size: 47px;
}
.higt-low-temp{
    display: flex;
    justify-content: space-between;
    max-width: 100px;
}
.higt-low-temp span{
    font-size: 15px;
}
</style>