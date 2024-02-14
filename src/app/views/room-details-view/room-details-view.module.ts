import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomDetailsViewComponent } from './room-details-view.component';
import { FlexboxModule } from "../../../ui-kit/components/flexbox/src/flexbox.module";
import { DividerModule } from "primeng/divider";
import { CalendarModule } from "primeng/calendar";
import { CardModule } from "primeng/card";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReserveCardComponent } from './reserve-card/reserve-card.component';
import { ReserveCalendarComponent } from './reserve-calendar/reserve-calendar.component';
import { SpinnerOverlayModule } from "../../../ui-kit/components/spinner-overlay/spinner-overlay.module";

@NgModule({
  declarations: [
    RoomDetailsViewComponent,
    ReserveCardComponent,
    ReserveCalendarComponent
  ],
  exports: [RoomDetailsViewComponent],
  imports: [
    CommonModule,
    FlexboxModule,
    DividerModule,
    CalendarModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerOverlayModule
  ]
})
export class RoomDetailsViewModule {
}
