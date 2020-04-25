import { Component, OnInit } from '@angular/core';
import { List } from '../shared/lists.definition';
import { Observable, of } from 'rxjs';
import { AppService } from '../app.service';
import { ListsStore } from '../shared/lists.store';

@Component({
  selector: 'lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  lists: Observable<List[]> = of([]);

  constructor(
    private listsStore: ListsStore,
    private appService: AppService) { }

  ngOnInit() {
    this.lists = this.listsStore.lists;

    this.appService.listDeactivated.next();
  }
}