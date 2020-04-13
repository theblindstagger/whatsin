import { Component, OnInit } from '@angular/core';
import { ListsService } from './lists.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  lists: Observable<ListSummary[]> = of([]);

  constructor(private listService: ListsService) {
  }

  ngOnInit() {
    this.lists = this.listService.getLists();
  }
}

export interface ListSummary {
  name: string,
  itemCount: number
}