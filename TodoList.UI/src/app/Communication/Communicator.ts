/*import {HttpClient} from "@angular/common/http";
import {Inject} from "@angular/core";
import {ICardData} from "../card/i-card-data";

export interface ICommunicator {
  //GetTodoList(): ICardData[];

  SaveCard(card: ICardData): boolean;
}

export class Communicator implements ICommunicator {
  http: HttpClient;
  baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  GetTodoList(): ICardData[] {
    result: ICardData[] = null;
    this.http.get<ICardData[]>(this.baseUrl + 'todolist').subscribe(r => {
      result = r;
    }, error => console.error(error));
  }

  SaveCard(card: ICardData): boolean {
    this.http.put(this.baseUrl + 'todolist', card).subscribe();
  }


}*/
