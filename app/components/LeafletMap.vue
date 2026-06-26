<template>
  <div>
    <div ref="mapContainer" class="map"></div>

    <button
      class="map-btn"
      @click="openGoogleMaps"
      :disabled="latitude === null || longitude === null"
    >
      📍 View on Google Maps
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const mapContainer = ref<HTMLElement | null>(null);

// Store current location
const latitude = ref<number | null>(null);
const longitude = ref<number | null>(null);

function openGoogleMaps() {
  if (latitude.value !== null && longitude.value !== null) {
    window.open(
      `https://www.google.com/maps?q=${latitude.value},${longitude.value}`,
      "_blank"
    );
  }
}

onMounted(async () => {
  if (!mapContainer.value) return;

  const leaflet = await import("leaflet");
  const L = leaflet.default;

  const map = L.map(mapContainer.value).setView([0, 0], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Save location
      latitude.value = lat;
      longitude.value = lng;

      map.setView([lat, lng], 18);

      L.marker([lat, lng])
        .addTo(map)
        .bindPopup("📍 Your Current Location")
        .openPopup();

      L.circle([lat, lng], {
        radius: position.coords.accuracy,
        color: "#2563eb",
        fillColor: "#2563eb",
        fillOpacity: 0.2,
      }).addTo(map);
    },
    (error) => {
      console.error(error);
      alert("Unable to get your location.");
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    }
  );
});
</script>

<style scoped>
.map {
  width: 100%;
  height: 500px;
  border-radius: 10px;
}

.map-btn {
  margin-top: 12px;
  width: 100%;
  padding: 12px;
  background: #16a34a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.map-btn:hover {
  background: #15803d;
}

.map-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}
</style>