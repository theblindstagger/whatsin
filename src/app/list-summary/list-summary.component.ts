import { Component, OnInit, Input } from '@angular/core';
import { ListSummary } from '../lists/lists.component';

@Component({
  selector: 'list-summary',
  templateUrl: './list-summary.component.html',
  styleUrls: ['./list-summary.component.scss']
})
export class ListSummaryComponent implements OnInit {
  @Input("list") list: ListSummary = null;

  constructor() { }

  ngOnInit(): void {
  }
}
