import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "./material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { HttpClientModule } from "@angular/common/http";
import { NumberOnlyDirective } from "./_directives/number-only.directive";
import { MessageControlComponent } from "./services/message-control/message-control.component";
import { ConfirmationDialogComponent } from "./_dialogs/confirmation-dialog/confirmation-dialog.component";
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule
    //directives

    //dialogs
  ],
  declarations: [
    NumberOnlyDirective,
    MessageControlComponent,
    ConfirmationDialogComponent
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NumberOnlyDirective,
    MessageControlComponent,
    ConfirmationDialogComponent
  ],
  entryComponents: [ConfirmationDialogComponent]
})
export class SharedModule {}
