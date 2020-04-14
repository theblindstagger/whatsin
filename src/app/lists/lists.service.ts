import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { IList, IListItem } from 'shared/list.definition';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  rawData: IList[] = [{
      id: 1,
      name: "Pantry",
      items: [{
        id: 1,
        name: "Pizza sauce",
        quantity: 1
      }, {
        id: 1,
        name: "Ketchup",
        quantity: 2
      }, {
        id: 3,
        name: "Frank's hot sauce",
        quantity: 2
      }]
    }, {
      id: 2,
      name: "Freezer",
      items: [{
        id: 4,
        name: "Beef mince",
        quantity: 1
      }, {
        id: 5,
        name: "Soup",
        quantity: 2
      }, {
        id: 6,
        name: "Chilli",
        quantity: 3
      }]
    }, {
      id: 3,
      name: "Laundry",
      items: [{
        id: 7,
        name: "Fabric softener",
        quantity: 1
      }]
    }
  ];

  lists: List[] = [];
  listCreated: Subject<string> = new Subject<string>();
  listItemAdded: Subject<string> = new Subject<string>();

  constructor() {
    this.lists = this.rawData.map(list => new List(list));
    this.listCreated.subscribe(this.onListAdded);
  }

  public getLists(): Observable<List[]> {
    return of(this.lists);
  }

  public getList(id: number): List {
    return this.lists.find(list => list.id === id);
  }

  private onListAdded = (listName: string) => {
    this.lists.push(new List({
      id: 0,
      name: listName,
      items: []
    }));
  }
}

export class List implements IList {
  id: number;
  name: string;
  items?: IListItem[];

  constructor(list: IList) {
    this.id = list.id;
    this.name = list.name;
    this.items = list.items;
  }

  get itemCount(): number {
    return this.items.length;
  }
}
