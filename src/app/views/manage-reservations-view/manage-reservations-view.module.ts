import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageReservationsViewComponent } from './manage-reservations-view.component';
import { FlexboxModule } from "../../../ui-kit/components/flexbox/src/flexbox.module";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { SpinnerOverlayModule } from "../../../ui-kit/components/spinner-overlay/src/spinner-overlay.module";
import { ConfirmationService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";

@NgModule({
  declarations: [
    ManageReservationsViewComponent
  ],
  providers: [ConfirmationService],
  imports: [
    CommonModule,
    FlexboxModule,
    TableModule,
    ButtonModule,
    SpinnerOverlayModule,
    ConfirmDialogModule
  ]
})
export class ManageReservationsViewModule { }
