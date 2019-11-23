import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { SharedModule } from '../shared/shared.module';
import { FilterHistoryComponent } from './filter-history/filter-history.component';


@NgModule({
  declarations: [HistoryComponent, FilterHistoryComponent],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    SharedModule
  ],
  entryComponents:[FilterHistoryComponent]
})
export class HistoryModule { }
