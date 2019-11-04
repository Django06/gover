import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaisseManagerComponent } from './caisse-manager.component';


const routes: Routes = [
  {
    path: '',
    component: CaisseManagerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaisseManagerRoutingModule { }
