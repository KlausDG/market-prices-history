<template>
  <div class="qr-scanner">
    <div id="reader" class="reader"></div>
    <p v-if="decodedText">QR Code: {{ decodedText }}</p>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import ScanQrCode from "../application/usecase/ScanQrCode";
import { QrCodeScannerService } from "../application/services/QrCodeScannerService";

let decodedText = ref<string | null>(null);

const qrCodeScannerService = inject("qrCodeScanner") as QrCodeScannerService;

onMounted(async () => {
  try {
    qrCodeScannerService.build("reader");
    const scanQrCode = new ScanQrCode(qrCodeScannerService);
    decodedText.value = await scanQrCode.execute();
  } catch (error) {
    decodedText.value = "Error scanning QR Code.";
  }
});
</script>

<style scoped>
.reader {
  width: 100%;
  max-width: 500px;
  /* height: 500px; */
  border: 1px solid #ccc;
  margin: auto;
}
.qr-scanner {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
</style>
