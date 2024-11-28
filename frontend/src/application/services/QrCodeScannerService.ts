import { QrCodeScanner } from "../../infra/interfaces/QrCodeScanner";

export class QrCodeScannerService {
  constructor(readonly qrCodeScanner: QrCodeScanner) {}

  build(videoElementId: string) {
    this.qrCodeScanner.instantiate(videoElementId);
  }

  async startScanner(
    constraints: MediaTrackConstraints,
    options: { fps: number; qrbox: { width: number; height: number } },
    onDecoded: (decodedText: string) => void,
    onError: (errorMessage: string) => void
  ) {
    try {
      await this.qrCodeScanner.start(constraints, options, onDecoded, onError);
    } catch (error) {
      console.error("Error starting scanner:", error);
      onError("Failed to start the scanner.");
    }
  }

  async stopScanner() {
    await this.qrCodeScanner.stop();
  }
}
