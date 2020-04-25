import { Component, OnInit } from '@angular/core';
import { ListsStore } from '../shared/lists.store';

@Component({
  selector: 'add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent implements OnInit {

  isAddingNewList: boolean = false;
  newListName: string = "";

  constructor(private listsStore: ListsStore) { }

  ngOnInit(): void {
  }

  onNewListClick = () => {
    this.isAddingNewList = true;
  }

  onListAdded = () => {
    this.listsStore.addList(this.newListName);
    this.resetForm();
  }

  isAddDisabled = () => !this.newListName;

  resetForm = () => {
    this.newListName = "";
    this.isAddingNewList = false;
  }
}
