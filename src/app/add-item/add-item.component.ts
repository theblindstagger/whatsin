import { Component, OnInit } from '@angular/core';
import { ListsService } from '../lists/lists.service';

@Component({
  selector: 'add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  newItemName: string = null;

  constructor(private listsService: ListsService) { }

  ngOnInit(): void {
  }

  addItem = () => {
    this.listsService.listItemAdded.next(this.newItemName);
    this.newItemName = null;
  }
}
