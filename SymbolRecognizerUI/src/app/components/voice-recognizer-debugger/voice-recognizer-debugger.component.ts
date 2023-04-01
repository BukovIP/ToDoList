import {Component} from '@angular/core';
import {AudioRecorderService} from "../../services/services";

@Component({
  selector: 'app-voice-recognizer-debugger',
  templateUrl: './voice-recognizer-debugger.component.html',
  styleUrls: ['./voice-recognizer-debugger.component.css']
})
export class VoiceRecognizerDebuggerComponent {
  buttonLabel: string = 'record'
  private readonly _ars: AudioRecorderService;

  constructor(ars: AudioRecorderService) {
    this._ars = ars;
  }

  ngOnInit(): void {
    //this._ars.on
    //this.startHttpRequest();
  }

  onClick(): void {
    if (!this._ars)
      return;

    if (this._ars.recording)
      this._ars.stopRecording();
    else
      this._ars.startRecording();

    this.buttonLabel = this._ars.recording ? 'stop' : 'record';
  }

}
