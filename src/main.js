import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import WeatherPresetsView from './views/WeatherPresetsView.vue';
import WeatherView from './views/WeatherView.vue';

const routes =[
  {path: '/', component: WeatherPresetsView},
  {path: '/weather/:city', name: 'WeatherView', component: WeatherView}
];
const router = createRouter({
  history: createWebHistory(),
  routes
})
const pinia = createPinia()
createApp(App).use(pinia).use(router).mount('#app')
