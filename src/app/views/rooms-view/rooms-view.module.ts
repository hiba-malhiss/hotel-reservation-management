import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsViewComponent } from "./rooms-view.component";
import { RoomCardModule } from "../../components/room-card/room-card.module";
import { FlexboxModule } from "../../../ui-kit/components/flexbox/src/flexbox.module";
import { PaginatorModule } from "primeng/paginator";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { RoomFiltersSidebarModule } from "./room-filters-sidebar/room-filters-sidebar.module";

@NgModule({
  declarations: [RoomsViewComponent],
  imports: [
    CommonModule,
    RoomCardModule,
    FlexboxModule,
    PaginatorModule,
    ProgressSpinnerModule,
    RoomFiltersSidebarModule
  ],
  exports: [
    RoomsViewComponent
  ]
})
export class RoomsViewModule {
}
