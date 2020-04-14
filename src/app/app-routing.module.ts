import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { ListDetailsComponent } from './list-details/list-details.component';


const routes: Routes = [
  { path: "", redirectTo: 'lists', pathMatch: 'full' },
  { path: "lists", component: ListsComponent },
  { path: "list/:id", component: ListDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
