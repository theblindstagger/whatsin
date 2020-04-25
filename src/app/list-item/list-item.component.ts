import { Component, OnInit, Input } from '@angular/core';
import { IListItem } from 'shared/list.definition';
import { Guid } from 'guid-typescript';
import { ListsStore } from '../shared/lists.store';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input("listId") listId: Guid;
  @Input("item") item: IListItem;
  
  constructor(private listsStore: ListsStore) { }

  ngOnInit(): void {
  }

  onItemRenamed = () => {
    this.listsStore.renameItem(this.listId, this.item.id, this.item.name);
  }

  increment = () => {
    this.listsStore.incrementListItemQuantity(this.listId, this.item.id);
  }

  canDecrement = () => {
    return this.item.quantity > 0;
  }

  decrement = () => {
    this.listsStore.decrementListItemQuantity(this.listId, this.item.id);
  }
}
