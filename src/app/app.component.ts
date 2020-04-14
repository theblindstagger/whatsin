import { Component, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AppService } from './app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'whatsin';
  activeListName: string = null;

  constructor(
    private appService: AppService,
    private router: Router) {

  }

  ngOnInit() {
    this.appService.listActivated.subscribe(this.onListActivated);
    this.appService.listDeactivated.subscribe(this.onListDeactivated);
  }

  onListActivated = (listName: string) => {
    Promise.resolve(null).then(() => this.activeListName = listName);
  }

  onListDeactivated = () => {
    Promise.resolve(null).then(() => this.activeListName = null);
  }

  onHomeClick = () => {
    this.router.navigate(["/"]);
  }
}
