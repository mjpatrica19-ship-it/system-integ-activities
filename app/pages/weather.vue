<template>
  <div class="page-bg">
    <div class="weather-card">
      <h1>🌤 Weather Today</h1>

      <div v-if="currentWeather">
        <h2>{{ currentWeather.location.name }}</h2>

        <img
          :src="'https:' + currentWeather.current.condition.icon"
          :alt="currentWeather.current.condition.text"
        />

        <h3>{{ currentWeather.current.temp_c }}°C</h3>

        <p>{{ currentWeather.current.condition.text }}</p>

        <div class="details">
          <div>
            <span>💧 Humidity</span>
            <strong>{{ currentWeather.current.humidity }}%</strong>
          </div>

          <div>
            <span>🌬 Wind</span>
            <strong>{{ currentWeather.current.wind_kph }} km/h</strong>
          </div>

          <div>
            <span>🌡 Feels Like</span>
            <strong>{{ currentWeather.current.feelslike_c }}°C</strong>
          </div>
        </div>
      </div>

      <div v-else>
        Loading weather...
      </div>
    </div>
  </div>
</template>

<script setup>
// @ts-nocheck

import { ref, onMounted } from "vue"

definePageMeta({
  layout: "weather",
  middleware: "auth"
})

const currentWeather = ref(null)

const getWeatherData = async () => {
  try {
    const data = await $fetch(
      "https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=manila&aqi=no"
    )

    currentWeather.value = data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getWeatherData()
})
</script>

<style scoped>
.page-bg{
    background-image:url('');
    background-size:cover;
    background-position:center;
    background-repeat:no-repeat;

    width:100%;
    height:100vh;

    display:flex;
    justify-content:center;
    align-items:center;
}

.weather-card{
    width:380px;
    padding:30px;
    border-radius:25px;

    background:rgba(255,255,255,.18);
    backdrop-filter:blur(12px);

    color:white;
    text-align:center;

    box-shadow:0 8px 25px rgba(0,0,0,.3);
}

.weather-card h1{
    margin-bottom:20px;
    font-size:32px;
}

.weather-card h2{
    font-size:28px;
    margin:10px 0;
}

.weather-card h3{
    font-size:55px;
    margin:10px 0;
}

.weather-card img{
    width:90px;
}

.weather-card p{
    font-size:20px;
    margin-bottom:25px;
}

.details{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:15px;
}

.details div{
    background:rgba(255,255,255,.15);
    border-radius:15px;
    padding:15px;
}

.details span{
    display:block;
    font-size:14px;
}

.details strong{
    font-size:18px;
}
</style>