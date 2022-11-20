import {Component, OnInit, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CardData, ICardData} from '../card/i-card-data';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  cards: ICardData[] = [];
  faCartPlus = faPlus

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    http.get<ICardData[]>(baseUrl + 'todolist').subscribe(result => {
      this.cards = result;
    }, error => console.error(error));
  }

  ngOnInit(): void {
  }

  addNewCard():void{
    this.cards.push(new CardData());
  }

}


