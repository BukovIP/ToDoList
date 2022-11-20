import {Injectable} from '@angular/core';
import * as signalR from "@microsoft/signalr"
import {ChartModel} from '../interfaces/chart.model';

const HUB_URL = 'https://localhost:5001/chart';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public data: ChartModel[]= [];
  private hubConnection: signalR.HubConnection;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL)
      .build();
  }

  public startConnection = () => {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferchartdata', (data: ChartModel[]) => {
      this.data = data;
      console.log(data);
    });
  }

  public RecognizePoints = () => {
    this.hubConnection.invoke<string>('recognize', {points:[[1,2], [2,3]]}).then(p=>{
      console.log('Recognision result:' + p);
    });
  }

  /*
  private startHttpRequest = () => {
    this.http.get('https://localhost:5001/api/chart')
      .subscribe(res => {
        console.log(res);
      })
  }
   */
}
