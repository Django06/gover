import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { UserManagerComponent } from './user-manager.component';
import { UserManagerRoutingModule } from './user-manager-routing.module';
import { AddUserComponent } from './dialogs/add-user/add-user.component';
import { UpdateUserComponent } from './dialogs/update-user/update-user.component';


@NgModule({
  declarations: [UserManagerComponent, AddUserComponent, UpdateUserComponent],
  imports: [
    CommonModule,
    UserManagerRoutingModule,
    SharedModule
  ],
  entryComponents:[AddUserComponent,UpdateUserComponent]
})
export class UserManagerModule { }
