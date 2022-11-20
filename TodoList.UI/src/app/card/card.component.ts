import {Component, Inject, Input, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ICardData, CardData} from "./i-card-data";
import {faPenToSquare, faCheckSquare, faSquareXmark} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() data!: ICardData;
  private previousState: ICardData | null = null;
  @Input() edit: boolean = false;

  faPenToSquare = faPenToSquare;
  faCheckSquare = faCheckSquare;
  faSquareXmark = faSquareXmark;

  http: HttpClient;
  baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    console.log("Init");
  }

  onEditClick(): void {
    console.log("Edit");
    this.savePreviousState();
    this.edit = true;
  }

  private savePreviousState(): void {
    console.log("Save previous changes");
    this.previousState = new CardData(this.data);
  }

  onAppyEditChanges(): void {
    console.log("Apply changes");
    this.edit = false;

    this.requestSaveChanges();
  }

  private requestSaveChanges(): void {
    console.log("Try post changes");

    if (this.data.id === -1) {
      //todo: put create new
      this.http.put<CardData>(this.baseUrl + 'todolist', this.data)
        .subscribe(
          r => {
            console.log(r);
            this.loadState(r);
          },
          e => {
            console.error(e);
            this.loadPreviousState();
          });
    } else {
      //update
      this.http.post<CardData>(this.baseUrl + 'todolist', this.data)
        .subscribe(
          r => {
            console.log(r);
            this.loadState(r);
          },
          e => {
            console.error(e);
            this.loadPreviousState();
          });
    }
  }

  onDiscardEditChanges(): void {
    console.log("Discard changes");
    this.edit = false;
    this.loadPreviousState();
  }

  private loadState(cardData: ICardData): void {
    this.data.id = cardData.id;
    this.data.label = cardData.label;
    this.data.description = cardData.description;
  }

  private loadPreviousState(): void {
    console.log("Load previous state");
    if (this.previousState == null)
      throw new Error("Empty previous state.");

    this.loadState(this.previousState);
  }
}
