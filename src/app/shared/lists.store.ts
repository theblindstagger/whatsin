import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { IList, ObjectState } from 'shared/list.definition';
import { Guid } from 'guid-typescript';
import { debounce } from 'rxjs/operators';
import { List, ListItem } from './lists.definition';
import { ListItemComponent } from '../list-item/list-item.component';
@Injectable({
  providedIn: 'root'
})
export class ListsStore {
  rawData: IList[] = [{
    id: Guid.parse("ba6f1feb-dd54-9b12-19c1-87a7ad879451"),
    name: "Pantry",
    items: [{
      id: Guid.parse("12e0bd00-1b1e-347d-417e-c5ded81f2213"),
      name: "Pizza sauce",
      quantity: 1,
      state: ObjectState.notchanged
    }, {
      id: Guid.parse("75575655-2761-383c-e212-631c0d534057"),
      name: "Ketchup",
      quantity: 2,
      state: ObjectState.notchanged
    }, {
      id: Guid.parse("de388656-7502-2706-3d44-f888a44394f4"),
      name: "Frank's hot sauce",
      quantity: 2,
      state: ObjectState.notchanged
    }],
    state: ObjectState.notchanged
  }, {
    id: Guid.parse("67abba47-7d90-d2cf-919d-58ebff27ff1c"),
    name: "Freezer",
    items: [{
      id: Guid.parse("e383b1b8-95a1-abad-8efe-8cd9ebd15ac4"),
      name: "Beef mince",
      quantity: 1,
      state: ObjectState.notchanged
    }, {
      id: Guid.parse("4d526c23-abc5-d00b-2b81-e4d0ee078d48"),
      name: "Soup",
      quantity: 2,
      state: ObjectState.notchanged
    }, {
      id: Guid.parse("8d9612a1-9765-0ff3-bd0e-1cdd5bb8e60c"),
      name: "Chilli",
      quantity: 3,
      state: ObjectState.notchanged
    }],
    state: ObjectState.notchanged
  }, {
    id: Guid.parse("6f6d2534-969e-8784-0115-6784ed5c3bad"),
    name: "Laundry",
    items: [{
      id: Guid.parse("e517857b-b798-ff37-89cc-f1f7701366ed"),
      name: "Fabric softener",
      quantity: 1,
      state: ObjectState.notchanged
    }],
    state: ObjectState.notchanged
  }
  ];

  private _lists: BehaviorSubject<List[]> = new BehaviorSubject<List[]>(this.rawData.map(list => new List(list.name, list.id, list.items)));

  public readonly lists: Observable<List[]> = this._lists.asObservable();

  constructor() {
    this.lists.subscribe((lists: List[]) => {
      console.log("Updated list store");
    });
    this.lists.pipe(debounce(() => interval(2000))).subscribe((lists: List[]) => {
      const dto = this.determineChanges();
      console.log("Call save");
    });
  }

  public getList = (listId: Guid): List => {
    return this._lists.getValue().find(list => list.id.equals(listId));
  };

  public addListItem = (listId: Guid, itemName: string) => {
    const item: ListItem = new ListItem(itemName);
    this.getList(listId).items.push(item);
    this.publishUpdates();
  };

  public incrementListItemQuantity = (listId: Guid, itemId: Guid) => {
    this.getListItem(listId, itemId).increment();
    this.publishUpdates();
  };

  public decrementListItemQuantity = (listId: Guid, itemId: Guid) => {
    this.getListItem(listId, itemId).decrement();
    this.publishUpdates();
  };

  public addList = (listName: string) => {
    const list: List = new List(listName);
    this._lists.getValue().push(list);
    this.publishUpdates();
  };

  public renameList = (listId: Guid, listName: string) => {
    this.getList(listId).name = listName;
    this.publishUpdates();
  };

  public renameItem = (listId: Guid, itemId: Guid, itemName: string) => {
    this.getListItem(listId, itemId).name = itemName;
    this.publishUpdates;
  };

  private publishUpdates = () => {
    this._lists.next(this._lists.getValue());
  };

  private getListItem = (listId: Guid, itemId: Guid): ListItem => {
    return this.getList(listId).items.find(item => item.id.equals(itemId));
  };

  private determineChanges = (): UpdateDto => {
    const listsToSave = 
            this._lists
                .getValue()
                .filter(list => list.state !== ObjectState.notchanged)
                .map(list => new ListUpdateDto(list.id, list.name, list.state));

    const itemsToSave: ItemUpdateDto[] = [];

    this._lists
        .getValue()
        .forEach((list: IList) => {
            list.items
                .filter(item => item.state !== ObjectState.notchanged)
                .map(item => new ItemUpdateDto(item.id, list.id, item.name, item.quantity, item.state))
                .forEach(dto => itemsToSave.push(dto));
        });

    return {
      lists: listsToSave,
      items: itemsToSave
    }
  }
}

export class ListUpdateDto {
  id: Guid;
  name: string;
  state: ObjectState;

  constructor(id: Guid, name: string, state: ObjectState) {
    this.id = id;
    this.name = name;
    this.state = state;
  }
}

export class ItemUpdateDto {
  id: Guid;
  listId: Guid;
  name: string;
  quantity: number;
  state: ObjectState;

  constructor(id: Guid, listId: Guid, name: string, quantity: number, state: ObjectState) {
    this.id = id;
    this.listId = listId;
    this.name = name;
    this.quantity = quantity;
    this.state = state;
  }
}

export class UpdateDto {
  lists: ListUpdateDto[];
  items: ItemUpdateDto[];
}