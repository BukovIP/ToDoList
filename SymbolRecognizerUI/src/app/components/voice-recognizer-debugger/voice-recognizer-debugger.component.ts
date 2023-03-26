import { Component } from '@angular/core';
import {AudioRecorderService} from "../../services/services";

@Component({
  selector: 'app-voice-recognizer-debugger',
  templateUrl: './voice-recognizer-debugger.component.html',
  styleUrls: ['./voice-recognizer-debugger.component.css']
})
export class VoiceRecognizerDebuggerComponent {

  constructor(ars: AudioRecorderService) {
  }

  ngOnInit(): void {
    //this.startHttpRequest();
  }

}
