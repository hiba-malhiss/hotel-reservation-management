import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomCardComponent } from "./room-card.component";
import { CardModule } from "primeng/card";
import { FlexboxModule } from "../../../ui-kit/components/flexbox/src/flexbox.module";
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [RoomCardComponent],
  exports: [RoomCardComponent],
  imports: [
    CommonModule,
    CardModule,
    FlexboxModule,
    ButtonModule
  ]
})
export class RoomCardModule { }
