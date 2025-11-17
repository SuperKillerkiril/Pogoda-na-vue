import axios from 'axios';

const API_URL = "https://api.weather.yandex.ru/v2/forecast";
const API_KEY = "2373d829-76b3-4180-b6ae-9c8217ec49a5";

export async function getForecast(lat, lon, limit = 3) {
    const {data} = await axios.get(API_URL,{
        params: { lat, lon, limit, lang: 'ru_RU'},
        headers:{'X-Yandex-Weather-Key': API_KEY}
    });
    return data;
}