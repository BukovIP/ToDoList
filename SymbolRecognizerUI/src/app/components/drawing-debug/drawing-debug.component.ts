import {Component} from '@angular/core';
import {Point} from "../../interfaces/point";
import {ChartModel} from "../../interfaces/chart.model";
import {SignalrService} from "../../services/signalr.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-drawing-debug',
  templateUrl: './drawing-debug.component.html',
  styleUrls: ['./drawing-debug.component.css']
})
export class DrawingDebugComponent {
  chartData: ChartModel[] = [];

  constructor(public signalRService: SignalrService, private http: HttpClient) {
  }

  ngOnInit(): void {
    //this.startHttpRequest();
  }

  private startHttpRequest = () => {
    this.http.get('https://localhost:5001/api/chart')
      .subscribe(res => {
        console.log(res);
      })
  }

  onNewData(points: Point[]) {
    console.log(points);
    this.chartData= [{
      data: points,
      color: '',
      backgroundColor: '',
      label: 'Дата мать их поинты.'
    }];
  }
}
