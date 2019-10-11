import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "./material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { NumberOnlyDirective } from './_directives/number-only.directive';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    //directives
    
  ],
  declarations: [NumberOnlyDirective],
  exports: [MaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule,NumberOnlyDirective]
})
export class SharedModule {}
