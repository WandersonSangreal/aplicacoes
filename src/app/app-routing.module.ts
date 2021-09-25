import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from "./components/list/list.component";
import {RescueComponent} from "./components/rescue/rescue.component";

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'rescue',
    component: RescueComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
