import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { SubscriptionManagerComponent } from '../subscription-manager/subscription-manager.component';

@Component({
  selector: 'hrm-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends SubscriptionManagerComponent {
  signupForm: FormGroup;

  @Input()
  isVisible: boolean = false;

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    super();
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.authService.isSignUpVisible$
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => {
        this.isVisible = val;
      });
  }

  getControl(filedName: string) {
    return this.signupForm?.get(filedName) as FormControl;
  }

  hideSignUpDialog() {
    this.isVisible = false;
    this.authService.isSignUpVisible$.next(false);
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService
        .register(
          this.signupForm.value.name.trim(),
          this.signupForm.value.email.trim(),
          this.signupForm.value.password
        )
        .pipe(
          catchError(error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error
            });
            throw error;
          })
        )
        .subscribe(() => {
          this.hideSignUpDialog();
        });
    }
  }

  onLogin() {
    this.hideSignUpDialog();
    this.authService.isLoginVisible$.next(true);
  }
}
