<script>
    export default{
        name: "BottomNav"
    };
</script>

<template>
    <div class="pt-4 fixed bottom-0 left-0 right-0 bg-gray-700/70 border-t border-gray-500 pr-5 pl-5">
        <ul class="flex justify-between items-center pb-4">
            <li>               
                <router-link class="max-h-min"
                    :to="{name: 'WeatherView', params: {city: encodeURIComponent('My Location')}}"
                >
                    <img class="w-7" src="../../assets/icons/map.svg"></img>
                </router-link>
            </li>
            <li>
                <router-link class="flex"
                    :to="{name: 'WeatherView', params: {city: encodeURIComponent('My Location')}}"
                >
                    <img class="m-2" src="../../assets/icons/marker.svg"/>
                    <img class="m-2" src="../../assets/icons/Ellipse.svg"/>
                </router-link>
            </li>
            <li>
                <router-link class="w-7"
                    to="/"
                >
                    <img src="../../assets/icons/burger-menu.svg"/>
                </router-link>
            </li>
        </ul>
    </div>
</template>