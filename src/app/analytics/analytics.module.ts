import { DialogComponent } from './dialog/dialog/dialog.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';


@NgModule({
  declarations: [AnalyticsComponent, DialogComponent],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    SharedModule
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class AnalyticsModule {}
