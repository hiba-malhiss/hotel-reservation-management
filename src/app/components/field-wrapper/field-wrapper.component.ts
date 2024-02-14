import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { ValidationErrorMessages } from "./validation-error-messages";

@Component({
  selector: 'hrm-field-wrapper',
  templateUrl: './field-wrapper.component.html',
  styleUrls: ['./field-wrapper.component.scss']
})
export class FieldWrapperComponent implements OnInit {
  @Input()
  control!: FormControl;

  @Input()
  label!: string;

  constructor() { }

  ngOnInit(): void {
  }

  getErrorMessage(): string {
    if (this.control.errors) {
      const errorKey: string = Object.keys(this.control.errors)[0];
      return ValidationErrorMessages[errorKey] || 'Field is not valid';
    }
    return '';
  }
}
