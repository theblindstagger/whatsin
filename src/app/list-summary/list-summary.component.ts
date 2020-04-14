import { Component, OnInit, Input } from '@angular/core';
import { List } from '../lists/lists.service';
import { Router } from '@angular/router';

@Component({
  selector: 'list-summary',
  templateUrl: './list-summary.component.html',
  styleUrls: ['./list-summary.component.scss']
})
export class ListSummaryComponent implements OnInit {
  @Input("list") list: List = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick = () => {
    this.router.navigate(["list", this.list.id]);
  }
}
