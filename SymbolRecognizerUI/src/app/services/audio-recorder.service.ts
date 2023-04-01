import {Injectable} from '@angular/core';
import {delay, of} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AudioRecorderService {

  recorder: MediaRecorder | undefined;
  state: string = 'init';
  recording: boolean = false;
  error: string = '';
  private EventListenerObject: any;

  constructor() {
    const mediaConstraints: MediaStreamConstraints = {
      video: false,
      audio: true,

    };
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  /**
   * Will be called automatically.
   */
  successCallback(stream: MediaStream) {
    this.recorder = new MediaRecorder(stream);
    this.recorder.ondataavailable = this.onDataAvailable;
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

  public startRecording() {
    this.recording = true;
    this.recorder?.start();
  }

  public stopRecording() {
    this.recorder?.stop();
    this.recording = false;
  }

  private onDataAvailable(event: BlobEvent) {
    const blob = event.data;
    console.log(event);
    console.log(blob);

    /*this.url = URL.createObjectURL(blob);
    console.log("blob", blob);
    console.log("url", this.url);*/
  }

  private errorCallback(error: any) {
    this.error = 'Can not play audio in your browser';
    this.state = 'error';
    console.error(error);
    console.error(this.error);
  }
}
