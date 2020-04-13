import { Component, OnInit } from '@angular/core';
import { ListsService } from '../lists/lists.service';

@Component({
  selector: 'add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent implements OnInit {

  isAddingNewList: boolean = false;
  newListName: string = "";

  constructor(private listService: ListsService) { }

  ngOnInit(): void {
  }

  onNewListClick = () => {
    this.isAddingNewList = true;
  }

  onListAdded = () => {
    this.listService.listCreated.next(this.newListName);
    this.resetForm();
  }

  resetForm = () => {
    this.newListName = "";
    this.isAddingNewList = false;
  }
}
