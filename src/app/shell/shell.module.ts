import { NgModule } from '@angular/core';
import { ShellRoutingModule } from './shell-routing.module';
import { AppBarComponent } from './app-bar/app-bar.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShellComponent } from './shell.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    AppBarComponent,
    NavigationBarComponent,
    DashboardComponent,
    ShellComponent
  ],
  imports: [ShellRoutingModule,SharedModule,CommonModule,ChartsModule
  ]
})
export class ShellModule {}
