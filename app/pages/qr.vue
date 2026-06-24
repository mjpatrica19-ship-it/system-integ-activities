<template>
  <div>
    <video
      ref="videoRef"
      class="w-full max-w-md rounded border"
    ></video>

    <div class="mt-4 flex gap-2">
      <button
        @click="startScanner"
        class="px-4 py-2 bg-green-600 text-white rounded"
      >
        Start Scanner
      </button>

      <button
        @click="stopScanner"
        class="px-4 py-2 bg-red-600 text-white rounded"
      >
        Stop Scanner
      </button>
    </div>

    <p v-if="result" class="mt-4">
      Scanned: {{ result }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const videoRef = ref<HTMLVideoElement | null>(null)
const result = ref('')

let qrScanner: any = null

const initScanner = async () => {
  const QrScanner = (await import('qr-scanner')).default

  if (!videoRef.value || qrScanner) return

  qrScanner = new QrScanner(
    videoRef.value,
    (scanResult: any) => {
      console.log('decoded qr code:', scanResult)

      result.value =
        typeof scanResult === 'string'
          ? scanResult
          : scanResult.data
    },
    {
      returnDetailedScanResult: true,
      highlightScanRegion: true,
      highlightCodeOutline: true,
    }
  )
}

const startScanner = async () => {
  if (!qrScanner) {
    await initScanner()
  }

  await qrScanner?.start()
}

const stopScanner = () => {
  qrScanner?.stop()
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