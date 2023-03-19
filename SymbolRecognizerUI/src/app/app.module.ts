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

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    DrawingComponent,
    DrawingDebugComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartAllModule,
    ButtonAllModule
  ],
  providers: [SignalrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
