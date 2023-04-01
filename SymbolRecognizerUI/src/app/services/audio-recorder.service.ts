import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {AudioRecognizerRequest} from "../interfaces/audio-recognizer-request";


@Injectable({
  providedIn: 'root'
})
export class AudioRecorderService {
  subject: Subject<AudioRecognizerRequest> = new Subject<AudioRecognizerRequest>();
  recorder: MediaRecorder | undefined;
  state: string = 'init';
  recording: boolean = false;
  error: string = '';
  mediaTrackSettings: MediaTrackSettings | undefined;
  mediaStreamConstraints: MediaStreamConstraints = {
    video: false,
    audio: true,
  };
  mediaRecorderOptions: MediaRecorderOptions = {
    mimeType: 'audio/webm;codecs=pcm',
    audioBitsPerSecond: 128000
  };

  constructor() {

    navigator.mediaDevices
      .getUserMedia(this.mediaStreamConstraints)
      .then(
        this.initRecorder.bind(this),
        this.errorCallback.bind(this)
      );
  }

  public subscribe(): Observable<AudioRecognizerRequest> {
    return this.subject;
  }

  public startRecording() {
    this.recording = true;
    this.recorder?.start();
  }

  public stopRecording() {
    this.recorder?.stop();
    this.recording = false;
  }

  /**
   * Will be called automatically.
   */
  private initRecorder(stream: MediaStream) {
    this.recorder = new MediaRecorder(stream, this.mediaRecorderOptions);
    this.recorder.ondataavailable = event =>
      event.data.arrayBuffer().then(
        this.onArrayBuffer.bind(this),
        this.errorCallback.bind(this)
      );

    const logEvent = (event: Event) => {
      console.log(event);
      if (this.recorder)
        this.state = this.recorder.state;
    };

    this.recorder.onerror = logEvent;
    this.recorder.onstart = logEvent;
    this.recorder.onresume = logEvent;
    this.recorder.onpause = logEvent;
    this.recorder.onstop = logEvent;

    this.LogSettings(stream);

    /*console.log(stream);
   const tracks = stream.getTracks();
   console.log(tracks);

   if(tracks.length==0)
     throw new Error("no tracks.");

   const track = tracks[0];
   console.log(track.getCapabilities());
   console.log(track.getConstraints());
   console.log(track.getSettings());*/

    /*console.log(recorder.state);
    of('').pipe(delay(5000)).subscribe(e=> {
      recorder.stop();
      });*/

    /*const options = {
      mimeType: "audio/wav",
      numberOfAudioChannels: 1,
      sampleRate: 16000,
    };
    //Start Actuall Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();*/
  }

  private onArrayBuffer(arrayBuf: ArrayBuffer): void {
    console.log(arrayBuf);
    const int16Array = new Int16Array(arrayBuf, 0, Math.floor(arrayBuf.byteLength / 2));
    console.log(int16Array);
    const result: AudioRecognizerRequest = {
      data: arrayBuf,
      formattedData: int16Array,
      sampleRate: this.mediaTrackSettings?.sampleRate,
      sampleSize: this.mediaTrackSettings?.sampleSize,
      channelCount: 1,
    }
    this.subject.next(result);
  }

  private errorCallback(error: any) {
    this.error = 'Can not play audio in your browser';
    this.state = 'error';
    console.error(error);
    console.error(this.error);
  }

  private LogSettings(stream: MediaStream): void {
    if (!stream)
      return;
    const tracks = stream.getTracks();
    if (tracks.length == 0)
      return;
    const track = tracks[0];
    this.mediaTrackSettings = track?.getSettings();
    console.log(this.mediaTrackSettings);
  }
}
