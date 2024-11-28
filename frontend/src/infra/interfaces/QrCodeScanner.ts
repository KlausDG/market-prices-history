export interface QrCodeScanner {
  instantiate(videoElementId: string): void;
  start(
    constraints: MediaTrackConstraints,
    options: { fps: number; qrbox: { width: number; height: number } },
    onDecoded: (decodedText: string) => void,
    onError: (errorMessage: string) => void
  ): Promise<void>;
  stop(): Promise<void>;
}
