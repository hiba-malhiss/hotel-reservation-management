import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { DialogModule } from "primeng/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { FieldWrapperModule } from "../field-wrapper/field-wrapper.module";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    FieldWrapperModule,
    InputTextModule,
    ButtonModule
  ]
})
export class LoginModule { }
