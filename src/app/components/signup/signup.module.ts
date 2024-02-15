import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldWrapperModule } from '../field-wrapper/field-wrapper.module';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [SignupComponent],
  exports: [SignupComponent],
  providers: [DialogService, MessageService],
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    FieldWrapperModule,
    InputTextModule,
    ButtonModule
  ]
})
export class SignupModule {}
