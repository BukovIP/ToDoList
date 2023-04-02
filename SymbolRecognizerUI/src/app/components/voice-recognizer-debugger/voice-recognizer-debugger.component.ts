import {Component} from '@angular/core';
import {AudioRecorderService} from "../../services/services";
import {ChartModel} from "../../interfaces/chart.model";
import {Point} from "../../interfaces/point";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-voice-recognizer-debugger',
  templateUrl: './voice-recognizer-debugger.component.html',
  styleUrls: ['./voice-recognizer-debugger.component.css']
})
export class VoiceRecognizerDebuggerComponent {
  buttonLabel: string = 'record'
  private readonly _ars: AudioRecorderService;
  public chartData: ChartModel[] | undefined;

  constructor(ars: AudioRecorderService, client: HttpClient) {
    this._ars = ars;
    this._ars.subscribe().subscribe(p => {
      client.post('http://localhost:8080/', p);
      console.log('start drawing');

      const toChartFunction = (array: Int16Array | Uint16Array | Int32Array) => {
        const points: Point[] = [];
        const max = (1 << 16) ;
        array.forEach((q, n) => {

          avg += q;

          if (n % throttler == 0) {
            //points.push({y: max * 2 / throttler, x: n});
            //points.push({y: min * 2 / throttler, x: n + 1});
            points.push({y: avg / (max * throttler), x: n});
            avg = 0;
          }
        });
        return points;
      };

      let avg = 0, throttler = 1000;

      const int16Array = new Int16Array(p.data, 0, Math.floor(p.data.byteLength / 2));
      console.log(int16Array);
      const points16 = toChartFunction(int16Array);

      const int32Array = new Int32Array(p.data, 0, Math.floor(p.data.byteLength / 4));
      console.log(int32Array);
      throttler = 500;
      const points32 = toChartFunction(int32Array);

      console.log('drawing is finished');
      this.chartData = [{
        label: `16`,
        data: points16,
        color: undefined,
        backgroundColor: undefined
      },
        /*{
          label: `32`,
          data: points32,
          color: undefined,
          backgroundColor: undefined
        }*/]
    });
  }

  ngOnInit(): void {
    //this._ars.on
    //this.startHttpRequest();
  }

  onClick(): void {
    if (!this._ars)
      return;

    if (this._ars.isRecording())
      this._ars.stopRecording();
    else
      this._ars.startRecording();

    this.buttonLabel = this._ars.isRecording() ? 'stop' : 'record';
  }

}
