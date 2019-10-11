import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { UserManagerComponent } from './user-manager.component';
import { UserManagerRoutingModule } from './user-manager-routing.module';
import { AddUserComponent } from './dialogs/add-user/add-user.component';


@NgModule({
  declarations: [UserManagerComponent, AddUserComponent],
  imports: [
    CommonModule,
    UserManagerRoutingModule,
    SharedModule
  ],
  entryComponents:[AddUserComponent]
})
export class UserManagerModule { }
