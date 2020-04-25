import { IList, IListItem, ObjectWithState, ObjectState } from 'shared/list.definition';
import { Guid } from 'guid-typescript';

export class List extends ObjectWithState implements IList {
  id: Guid;
  name: string;
  items?: ListItem[];

  constructor(name: string, id: Guid = null, items: IListItem[] = []) {
    super();
    
    this.id = id || Guid.create();
    this.name = name;
    this.items = items.map(item => new ListItem(item.name, item.id, item.quantity));
    this.state = id ? ObjectState.notchanged : ObjectState.added;
  }

  get itemCount(): number {
    return this.items.length;
  }

  get totalCount(): number {
    return this.itemCount 
      ? this.items
            .map((item:ListItem) => item.quantity)
            .reduce((a: number, b: number): number => a + b)
      : 0;
  }

  public updateName(name: string) {
    this.name = name;
    this.setAsModified();
  }
}

export class ListItem extends ObjectWithState implements IListItem {
  id: Guid;
  name: string;
  quantity: number;

  constructor(name: string, id: Guid = null, quantity: number = 1) {
    super();

    this.id = id ?? Guid.create();
    this.name = name;
    this.quantity = quantity;
    this.state = id ? ObjectState.notchanged : ObjectState.added;
  }

  public increment(): number {
    this.setAsModified();
    return this.quantity++;
  }

  public decrement(): number {
    this.setAsModified();
    return this.quantity--;
  }
}
