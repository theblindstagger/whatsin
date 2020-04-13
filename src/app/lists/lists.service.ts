import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { ListSummary } from '../lists/lists.component';
import { ListSummaryComponent } from '../list-summary/list-summary.component';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  lists: ListSummary[] = [];
  listCreated: Subject<string> = new Subject<string>();

  constructor() {
    this.lists = [{
        name: "Pantry",
        itemCount: 65
      }, {
        name: "Freezer",
        itemCount: 33
      }, {
        name: "Laundry",
        itemCount: 22
      }
    ];

    this.listCreated.subscribe(this.onListAdded);
  }

  public getLists(): Observable<ListSummary[]> {
    return of(this.lists);
  }

  private onListAdded = (listName: string) => {
    this.lists.push({
      name: listName,
      itemCount: 0
    });
  }
}
