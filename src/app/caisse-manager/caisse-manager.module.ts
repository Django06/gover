import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaisseManagerRoutingModule } from './caisse-manager-routing.module';
import { CaisseManagerComponent } from './caisse-manager.component';
import { SharedModule } from '../shared/shared.module';
import { AddCaisseComponent } from './dialogs/add-caisse/add-caisse.component';
import { ModifyCaisseComponent } from './dialogs/modify-caisse/modify-caisse.component';


@NgModule({
  declarations: [CaisseManagerComponent, AddCaisseComponent, ModifyCaisseComponent],
  imports: [
    CommonModule,
    CaisseManagerRoutingModule,
    SharedModule
  ],
  entryComponents:[AddCaisseComponent,ModifyCaisseComponent]
})
export class CaisseManagerModule { }
