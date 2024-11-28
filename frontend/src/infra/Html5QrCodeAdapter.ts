import { Html5Qrcode } from "html5-qrcode";
import { QrCodeScanner } from "./interfaces/QrCodeScanner";

export class Html5QrCodeAdapter implements QrCodeScanner {
  private html5QrCode: Html5Qrcode | null;

  constructor() {
    this.html5QrCode = null;
  }

  instantiate(videoElementId: string) {
    if (!this.html5QrCode) {
      this.html5QrCode = new Html5Qrcode(videoElementId);
    }
  }

  async start(
    constraints: MediaTrackConstraints,
    options: { fps: number; qrbox: { width: number; height: number }; formatsToSupport: [0] },
    onDecoded: (decodedText: string) => void,
    onError: (errorMessage: string) => void
  ): Promise<void> {
    if (this.html5QrCode) {
      await this.html5QrCode.start(constraints, options, onDecoded, onError);
    }
  }

  async stop(): Promise<void> {
    if (this.html5QrCode) {
      await this.html5QrCode.stop();
      this.html5QrCode.clear();
    }
  }
}
