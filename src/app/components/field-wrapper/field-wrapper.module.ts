import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldWrapperComponent } from './field-wrapper.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    FieldWrapperComponent
  ],
  exports: [
    FieldWrapperComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class FieldWrapperModule { }
