<template>
  <v-container fluid class="dashboard-bg fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card rounded="xl" elevation="12" class="pa-6 text-center">

          <!-- Profile -->
          <v-avatar size="100" class="mb-4">
            <v-img
              :src="user?.picture"
              alt="Profile"
            />
          </v-avatar>

          <h1 class="text-h4 font-weight-bold mb-1">
            Welcome 👋
          </h1>

          <div class="text-h6 font-weight-medium">
            {{ user?.name }}
          </div>

          <div class="text-body-2 text-grey-darken-1 mb-6">
            {{ user?.email }}
          </div>

          <v-divider class="mb-6" />

          <!-- Map -->
          <ClientOnly>
            <LeafletMap />
          </ClientOnly>

          <!-- QR Scanner Button -->
          <v-btn
            color="primary"
            size="large"
            prepend-icon="mdi-qrcode-scan"
            block
            class="mt-4 mb-3"
            @click="openScanner"
          >
            Open QR Scanner
          </v-btn>

          <!-- Weather Button -->
          <v-btn
            color="info"
            size="large"
            prepend-icon="mdi-weather-partly-cloudy"
            block
            class="mb-3"
            @click="openWeather"
          >
            Weather
          </v-btn>

          <!-- Logout Button -->
          <v-btn
            color="error"
            size="large"
            prepend-icon="mdi-logout"
            block
            @click="logout"
          >
            Logout
          </v-btn>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// @ts-nocheck

definePageMeta({
  middleware: "auth"
})

const user = ref<any>(null)

onMounted(() => {
  const savedUser = localStorage.getItem("google_user")

  if (!savedUser) {
    navigateTo("/login")
    return
  }

  user.value = JSON.parse(savedUser)
})

// Open QR Scanner Page
const openScanner = () => {
  navigateTo("/qr")
}

// Open Weather Page
const openWeather = () => {
  navigateTo("/weather")
}

// Logout
const logout = () => {
  localStorage.removeItem("google_user")
  localStorage.removeItem("google_token")

  if (window.google?.accounts?.id) {
    window.google.accounts.id.disableAutoSelect()
  }

  navigateTo("/login")
}
</script>

<style scoped>
.dashboard-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
}

.fill-height {
  min-height: 100vh;
}

.v-card {
  backdrop-filter: blur(15px);
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
}

.v-avatar {
  margin: auto;
}

.v-btn {
  text-transform: none;
  font-weight: 600;
}
</style>