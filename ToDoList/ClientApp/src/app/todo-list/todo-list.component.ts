import {Component, OnInit, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ICardData } from '../card/i-card-data';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  cards: ICardData[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    http.get<ICardData[]>(baseUrl + 'todolist').subscribe(result => {
      this.cards = result;
    }, error => console.error(error));
  }

  ngOnInit(): void {
  }

}


