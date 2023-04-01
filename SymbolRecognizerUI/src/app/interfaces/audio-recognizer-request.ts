export interface AudioRecognizerRequest {
  channelCount: number;
  sampleRate: number | undefined;
  sampleSize: number | undefined;
  data: ArrayBuffer;
  formattedData: Int16Array;
}
