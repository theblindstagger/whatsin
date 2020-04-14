import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListsComponent } from './lists/lists.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularMaterialModule } from './angular-material.module';
import { ListSummaryComponent } from './list-summary/list-summary.component';
import { AddListComponent } from './add-list/add-list.component';
import { ListsService } from './lists/lists.service';
import { FormsModule } from '@angular/forms';
import { ListDetailsComponent } from './list-details/list-details.component';
import { ListItemComponent } from './list-item/list-item.component';
import { AppService } from './app.service';
import { AddItemComponent } from './add-item/add-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ListsComponent,
    ListSummaryComponent,
    AddListComponent,
    ListDetailsComponent,
    ListItemComponent,
    AddItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularMaterialModule,
    HammerModule,
    FormsModule
  ],
  providers: [
    ListsService,
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
