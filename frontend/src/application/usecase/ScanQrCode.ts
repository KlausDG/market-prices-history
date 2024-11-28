import { QrCodeScannerService } from "../services/QrCodeScannerService";

export default class ScanQrCode {
  constructor(readonly qrCodeScannerService: QrCodeScannerService) {}

  execute() {
    return new Promise<string>((resolve) => {
      this.qrCodeScannerService.startScanner(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText: string) => {
          this.qrCodeScannerService.stopScanner();
          resolve(decodedText);
        },
        (_: string) => {}
      );
    });
  }
}
