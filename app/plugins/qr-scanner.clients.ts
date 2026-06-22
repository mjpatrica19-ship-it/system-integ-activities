// plugins/qr-scanner.client.ts
import QrScanner from 'qr-scanner'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      qrScanner: QrScanner
    }
  }
})