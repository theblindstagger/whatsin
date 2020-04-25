import { Component, OnInit, Input } from '@angular/core';
import { Guid } from 'guid-typescript';
import { ListsStore } from '../shared/lists.store';

@Component({
  selector: 'add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  @Input("listId") listId: Guid;
  
  newItemName: string = null;

  constructor(private listsStore: ListsStore) { }

  ngOnInit(): void {
  }

  addItem = () => {
    this.listsStore.addListItem(this.listId, this.newItemName);
    this.newItemName = null;
  }

  isAddDisabled = () => !this.newItemName;
}
