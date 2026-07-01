<template>
  <div class="scanner-container">
    <video
      ref="videoRef"
      class="scanner-video"
    ></video>

    <div class="buttons">
      <button @click="startScanner">
        ▶ Start Scanner
      </button>

      <button @click="stopScanner">
        ■ Stop Scanner
      </button>
    </div>

    <p v-if="result" class="success">
      ✅ Scanned:
      <strong>{{ result }}</strong>
    </p>

    <p v-if="error" class="error">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"

const videoRef = ref<HTMLVideoElement | null>(null)
const result = ref("")
const error = ref("")

let qrScanner: any = null

const initScanner = async () => {
  try {
    if (!videoRef.value || qrScanner) return

    const QrScanner = (await import("qr-scanner")).default

    qrScanner = new QrScanner(
      videoRef.value,
      (scanResult: any) => {
        result.value =
          typeof scanResult === "string"
            ? scanResult
            : scanResult.data

        console.log("QR Code:", result.value)

        // Uncomment if you want to stop after one scan
        // stopScanner()
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    )
  } catch (err) {
    console.error(err)
    error.value = "Failed to initialize scanner."
  }
}

const startScanner = async () => {
  try {
    error.value = ""

    if (!qrScanner) {
      await initScanner()
    }

    await qrScanner.start()
  } catch (err: any) {
    console.error(err)
    error.value =
      "Unable to access the camera. Please allow camera permission."
  }
}

const stopScanner = () => {
  if (qrScanner) {
    qrScanner.stop()
  }
}

onMounted(async () => {
  await initScanner()
})

onBeforeUnmount(() => {
  if (qrScanner) {
    qrScanner.stop()
    qrScanner.destroy()
  }
})
</script>

<style scoped>
.scanner-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.scanner-video {
  width: 100%;
  border-radius: 15px;
  border: 2px solid #1976d2;
  background: black;
}

.buttons {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  font-size: 16px;
}

button:first-child {
  background: #2e7d32;
}

button:last-child {
  background: #d32f2f;
}

.success {
  margin-top: 20px;
  color: green;
  font-size: 18px;
}

.error {
  margin-top: 20px;
  color: red;
}
</style>