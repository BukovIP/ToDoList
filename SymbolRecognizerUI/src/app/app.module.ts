import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { SignalrService } from './services/signalr.service';
import { DrawingComponent } from './components/drawing-component/drawing.component';



@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    DrawingComponent,
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    HttpClientModule,
  ],
  providers: [SignalrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
