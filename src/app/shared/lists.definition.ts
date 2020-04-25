import { IList, IListItem, ObjectWithState } from 'shared/list.definition';
import { Guid } from 'guid-typescript';

export class List extends ObjectWithState implements IList {
  id: Guid;
  name: string;
  items?: ListItem[];

  constructor(name: string, id: Guid = Guid.create(), items: IListItem[] = []) {
    super();

    this.id = id;
    this.name = name;
    this.items = items.map(item => new ListItem(item.name, item.id, item.quantity));
  }

  get itemCount(): number {
    return this.items.length;
  }

  get totalCount(): number {
    return this
              .items
              .map((item:ListItem) => item.quantity)
              .reduce((a: number, b: number): number => a + b);
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

  constructor(name: string, id: Guid = Guid.create(), quantity: number = 1) {
    super();

    this.id = id;
    this.name = name;
    this.quantity = quantity;
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
