import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JourneyRoutingModule } from './journey-routing.module';
import { JourneyComponent } from './journey.component';
import { SharedModule } from '../shared/shared.module';
import { ModifyJourneyComponent } from './Dialogs/modify-journey/modify-journey.component';


@NgModule({
  declarations: [JourneyComponent, ModifyJourneyComponent],
  imports: [
    CommonModule,
    JourneyRoutingModule,
    SharedModule
  ],
  entryComponents:[ModifyJourneyComponent]
})
export class JourneyModule { }
