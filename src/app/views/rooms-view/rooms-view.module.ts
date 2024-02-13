import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsViewComponent } from "./rooms-view.component";
import { RoomCardModule } from "../../components/room-card/room-card.module";
import { FlexboxModule } from "../../../ui-kit/components/flexbox/src/flexbox.module";
import { PaginatorModule } from "primeng/paginator";
import { ProgressSpinnerModule } from "primeng/progressspinner";

@NgModule({
  declarations: [RoomsViewComponent],
  imports: [
    CommonModule,
    RoomCardModule,
    FlexboxModule,
    PaginatorModule,
    ProgressSpinnerModule
  ],
  exports: [
    RoomsViewComponent
  ]
})
export class RoomsViewModule {
}
