import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationErrorMessages } from './validation-error-messages';

@Component({
  selector: 'hrm-field-wrapper',
  templateUrl: './field-wrapper.component.html',
  styleUrls: ['./field-wrapper.component.scss']
})
//change to like custom input using ControlValueAccessor,
// providers: [
//   {
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => FieldWrapperComponent),
//     multi: true
//   }
// ]
// inject controller from injector
export class FieldWrapperComponent implements OnInit {
  @Input()
  control!: FormControl;

  @Input()
  label!: string;

  constructor() {}

  ngOnInit(): void {}

  // change to pipe: message => control?.errors | errorString
  getErrorMessage(): string {
    if (this.control.errors) {
      const errorKey: string = Object.keys(this.control.errors)[0];
      return ValidationErrorMessages[errorKey] || 'Field is not valid';
    }
    return '';
  }
}
