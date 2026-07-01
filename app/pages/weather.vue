<template>
  <div class="page-bg">
    <div class="overlay">

      <button class="back-btn" @click="navigateTo('/')">
        ☰
      </button>

      <div class="search-btn">
        🔍
      </div>

      <div v-if="currentWeather" class="weather-container">

        <h2 class="city">
          {{ currentWeather.location.name }}
        </h2>

        <p class="date">
          {{
            new Date().toLocaleDateString("en-US",{
              weekday:"long",
              month:"long",
              day:"numeric"
            })
          }}
        </p>

        <div class="current-weather">

          <img
            class="weather-icon"
            :src="'https:' + currentWeather.current.condition.icon"
          />

          <div class="temperature">

            <h1>{{ currentWeather.current.temp_c }}°</h1>

            <div class="minmax">
              <p>↑ {{ currentWeather.forecast?.forecastday?.[0]?.day?.maxtemp_c ?? "--" }}°</p>
              <p>↓ {{ currentWeather.forecast?.forecastday?.[0]?.day?.mintemp_c ?? "--" }}°</p>
            </div>

          </div>

        </div>

        <div class="status">

          <h2>{{ currentWeather.current.condition.text }}</h2>

          <p>
            Feels Like
            {{ currentWeather.current.feelslike_c }}°
          </p>

        </div>

        <div class="weather-info">

          <div class="info-box">
            😊
            <span>UV</span>
            <strong>{{ currentWeather.current.uv }}</strong>
          </div>

          <div class="info-box">
            🌬
            <span>Wind</span>
            <strong>{{ currentWeather.current.wind_kph }} km/h</strong>
          </div>

          <div class="info-box">
            💧
            <span>Humidity</span>
            <strong>{{ currentWeather.current.humidity }}%</strong>
          </div>

          <div class="info-box">
            👁
            <span>Visibility</span>
            <strong>{{ currentWeather.current.vis_km }} km</strong>
          </div>
          <!-- Hourly Forecast -->

<div class="forecast-card">

  <div class="forecast-tabs">
    <span class="active">Weather</span>
    <span>Wind</span>
    <span>Humidity</span>
  </div>

  <div class="hourly">

    <div
      class="hour"
      v-for="(hour, index) in currentWeather.forecast.forecastday[0].hour.slice(
        new Date().getHours(),
        new Date().getHours() + 4
      )"
      :key="index"
    >

      <p>
        {{
          index === 0
            ? "Now"
            : new Date(hour.time).toLocaleTimeString([], {
                hour: "numeric",
                hour12: true
              })
        }}
      </p>

      <img
        :src="'https:' + hour.condition.icon"
        class="hour-icon"
      />

      <h3>{{ hour.temp_c }}°</h3>

    </div>

  </div>

</div>

        </div>

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
      "http://api.weatherapi.com/v1/forecast.json?key=06ba74db3be842dfa9535030262906&q=manila&days=1&aqi=no&alerts=no"  )

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
.forecast-card{

    margin-top:40px;

    padding:25px;

    border-radius:30px 30px 0 0;

    background:rgba(255,255,255,.12);

    backdrop-filter:blur(18px);

}

.forecast-tabs{

    display:flex;

    justify-content:space-around;

    margin-bottom:25px;

    font-size:22px;

    font-weight:bold;

}

.forecast-tabs .active{

    border-bottom:3px solid white;

    padding-bottom:8px;

}

.hourly{

    display:flex;

    justify-content:space-between;

    gap:20px;

    overflow-x:auto;

    padding-bottom:10px;

}

.hour{

    min-width:80px;

    text-align:center;

}

.hour p{

    font-size:16px;

    margin-bottom:10px;

}

.hour-icon{

    width:50px;

    height:50px;

}

.hour h3{

    margin-top:10px;

    font-size:24px;

}
.page-bg{
    background:url("/images/sunnyday.jpg") center center/cover;
    min-height:100vh;
}

.overlay{

    min-height:100vh;
    background:rgba(30,55,95,.45);
    backdrop-filter:blur(6px);

    color:white;

    position:relative;

    padding:30px;
}

.weather-container{

    max-width:500px;
    margin:auto;
    text-align:center;
}

.back-btn,
.search-btn{

    position:absolute;

    top:25px;

    width:50px;

    height:50px;

    border:none;

    border-radius:50%;

    background:rgba(255,255,255,.15);

    color:white;

    backdrop-filter:blur(15px);

    font-size:25px;

    cursor:pointer;
}

.back-btn{
    left:20px;
}

.search-btn{

    right:20px;

    display:flex;
    justify-content:center;
    align-items:center;
}

.city{

    font-size:42px;

    margin-top:30px;
}

.date{

    opacity:.8;

    margin-bottom:40px;
}

.current-weather{

    display:flex;

    justify-content:center;

    align-items:center;

    gap:30px;
}

.weather-icon{

    width:130px;
}

.temperature{

    display:flex;

    align-items:center;

    gap:15px;
}

.temperature h1{

    font-size:110px;

    margin:0;

    font-weight:600;
}

.minmax{

    text-align:left;

    font-size:22px;
}

.status{

    margin-top:25px;
}

.status h2{

    font-size:42px;

    margin-bottom:10px;
}

.status p{

    font-size:22px;

    opacity:.9;
}

.weather-info{

    display:grid;

    grid-template-columns:repeat(4,1fr);

    gap:15px;

    margin-top:50px;
}

.info-box{

    background:rgba(255,255,255,.12);

    backdrop-filter:blur(15px);

    border-radius:20px;

    padding:18px;

    display:flex;

    flex-direction:column;

    align-items:center;

    transition:.3s;
}

.info-box:hover{

    transform:translateY(-5px);
}

.info-box span{

    margin-top:8px;

    font-size:14px;

    opacity:.8;
}

.info-box strong{

    font-size:20px;

    margin-top:5px;
}

@media(max-width:600px){

.weather-info{

grid-template-columns:repeat(2,1fr);

}

.temperature h1{

font-size:80px;

}

.current-weather{

flex-direction:column;

}

.status h2{

font-size:30px;

}
}
</style>