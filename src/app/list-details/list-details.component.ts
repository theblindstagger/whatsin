import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List, ListsService } from '../lists/lists.service';
import { AppService } from '../app.service';

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
    private listService: ListsService,
    private appService: AppService) { }

  ngOnInit(): void {
    this.listService.listItemAdded.subscribe(this.onListItemAdded);
    this.route.paramMap.subscribe(params => {
      this.list = this.listService.getList(parseInt(params.get("id")));
      this.appService.listActivated.next(this.list.name);
      this.isLoaded = true;
    });
  }

  onListItemAdded = (newListItemName: string) => {
    this.list.items.push({
      id: 0,
      name: newListItemName,
      quantity: 1
    });
  }

}
