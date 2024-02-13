import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomFiltersSidebarComponent } from './room-filters-sidebar.component';
import { DividerModule } from "primeng/divider";
import { RadioButtonModule } from "primeng/radiobutton";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexboxModule } from "../../../../ui-kit/components/flexbox/src/flexbox.module";
import { CheckboxModule } from "primeng/checkbox";
import { ProgressSpinnerModule } from "primeng/progressspinner";

@NgModule({
  declarations: [
    RoomFiltersSidebarComponent
  ],
  exports: [
    RoomFiltersSidebarComponent
  ],
  imports: [
    CommonModule,
    DividerModule,
    RadioButtonModule,
    FormsModule,
    FlexboxModule,
    CheckboxModule,
    ReactiveFormsModule,
    ProgressSpinnerModule
  ]
})
export class RoomFiltersSidebarModule { }
