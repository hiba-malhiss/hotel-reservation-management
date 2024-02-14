import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DialogService } from "primeng/dynamicdialog";
import { MessageService } from "primeng/api";
import { AuthService } from "../../services/auth.service";
import { catchError } from "rxjs";

@Component({
  selector: 'hrm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  @Input()
  isVisible: boolean = false;

  constructor(private dialogService: DialogService,
              private messageService: MessageService,
              private fb: FormBuilder,
              private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.authService.isLoginVisible$.subscribe(val => {
      this.isVisible = val;
    })
  }

  getControl(filedName: string) {
    return this.loginForm?.get(filedName) as FormControl;
  }

  hideLoginDialog() {
    this.isVisible = false;
    this.authService.isLoginVisible$.next(false);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password)
      .pipe(catchError((error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "User doesn't exist" });
        throw error;
      }))
      .subscribe(() => {
        this.hideLoginDialog();
      })
    }
  }

  onRegister() {
    this.hideLoginDialog();
    this.authService.isSignUpVisible$.next(true);
  }

}
