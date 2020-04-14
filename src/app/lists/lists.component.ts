import { Component, OnInit } from '@angular/core';
import { ListsService, List } from './lists.service';
import { Observable, of } from 'rxjs';
import { IList } from 'shared/list.definition';
import { AppService } from '../app.service';

@Component({
  selector: 'lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  lists: Observable<List[]> = of([]);

  constructor(
    private listService: ListsService,
    private appService: AppService) { }

  ngOnInit() {
    this.lists = <Observable<List[]>>this.listService.getLists();
    this.appService.listDeactivated.next();
  }
}