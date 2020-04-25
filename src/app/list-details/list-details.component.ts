import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from '../shared/lists.definition';
import { AppService } from '../app.service';
import { Guid } from 'guid-typescript';
import { ListsStore } from '../shared/lists.store';

@Component({
  selector: 'list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss']
})
export class ListDetailsComponent implements OnInit {

  list: List = null;
  isLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private listsStore: ListsStore,
    private appService: AppService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.list = this.listsStore.getList(Guid.parse(params.get("id")));
      this.appService.listActivated.next(this.list.name);
      this.isLoaded = true;
    });
  }
}