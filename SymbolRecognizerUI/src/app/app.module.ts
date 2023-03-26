import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { SignalrService } from './services/signalr.service';
import { DrawingComponent } from './components/drawing-component/drawing.component';
import { ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { DrawingDebugComponent } from './components/drawing-debug/drawing-debug.component'
import {AudioRecorderService} from "./services/audio-recorder.service";
import { VoiceRecognizerDebuggerComponent } from './components/voice-recognizer-debugger/voice-recognizer-debugger.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    DrawingComponent,
    DrawingDebugComponent,
    VoiceRecognizerDebuggerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartAllModule,
    ButtonAllModule
  ],
  providers: [
    SignalrService,
    AudioRecorderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
