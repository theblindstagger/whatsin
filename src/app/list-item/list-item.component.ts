import { Component, OnInit, Input } from '@angular/core';
import { IListItem } from 'shared/list.definition';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input("item") item: IListItem;
  
  constructor() { }

  ngOnInit(): void {
  }

  canDecrement = () => {
    return this.item.quantity > 0;
  }

  decrement = () => {
    this.item.quantity--;
  }

  increment = () => {
    this.item.quantity++;
  }

}
