import {Component, OnInit, Input} from '@angular/core';
import {ChartModel} from "../../interfaces/chart.model";
import {
  AxisModel,
  ChartAreaModel, ChartTheme,
  ILoadedEventArgs,
  LegendSeriesModel,
  TooltipSettingsModel
} from "@syncfusion/ej2-charts";
import {Browser} from "@syncfusion/ej2-base";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {
  ngOnInit(): void {
      //throw new Error('Method not implemented.');
  }
  @Input() title: string = 'Drawing debugger.';
  @Input() charts: ChartModel[] = [];

  //Initializing Primary X Axis
  public primaryXAxis: AxisModel = {
    //valueType: '',
    edgeLabelPlacement: 'Shift',
    majorGridLines: {width: 0},
    //labelFormat: ''
  };
  //Initializing Primary Y Axis
  public primaryYAxis: AxisModel = {
    //title: 'Million Metric Tons',
    //minimum: 0,
    //maximum: 20,
    //interval: 4,
    //lineStyle: {width: 0},
    //majorTickLines: {width: 0},
  };
  public chartArea: ChartAreaModel = {
    border: {
      color: '#2b2b2b',
      width: 1
    }
  };

  public width: string = Browser.isDevice ? '75%' : '100%';
  public circleMarker: Object = {visible: true, height: 7, width: 7, shape: 'Circle', isFilled: true};
  public triangleMarker: Object = {visible: true, height: 6, width: 6, shape: 'Triangle', isFilled: true};
  public diamondMarker: Object = {visible: true, height: 7, width: 7, shape: 'Diamond', isFilled: true};
  public rectangleMarker: Object = {visible: true, height: 5, width: 5, shape: 'Rectangle', isFilled: true};
  public pentagonMarker: Object = {visible: true, height: 7, width: 7, shape: 'Pentagon', isFilled: true};

  public tooltip: TooltipSettingsModel = {
    enable: true
  };
  public legend: LegendSeriesModel = {
    visible: true,
    enableHighlight: true
  }

  public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
  };
}
