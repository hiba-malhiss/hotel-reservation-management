import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerOverlayComponent } from './spinner-overlay.component';
import { ProgressSpinnerModule } from "primeng/progressspinner";



@NgModule({
  declarations: [
    SpinnerOverlayComponent
  ],
  exports: [
    SpinnerOverlayComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule
  ]
})
export class SpinnerOverlayModule { }
