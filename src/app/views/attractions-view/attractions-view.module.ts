import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttractionsViewComponent } from './attractions-view.component';
import { MapModule } from "../../../ui-kit/components/map/src/map.module";

@NgModule({
  declarations: [
    AttractionsViewComponent
  ],
  imports: [
    CommonModule,
    MapModule
  ]
})
export class AttractionsViewModule { }
