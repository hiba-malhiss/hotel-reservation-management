import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService, User } from "../../services/auth/auth.service";
import { SubscriptionManagerComponent } from "../subscription-manager/subscription-manager.component";
import { takeUntil } from "rxjs";

interface AppBarButton {
  label: string,
  onClick: () => void,
  shouldHide?: () => boolean,
  icon?: string,
  class?: string
}

@Component({
  selector: 'hrm-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent extends SubscriptionManagerComponent {
  isLoggedIn: boolean = false;
  currentUser: User | null = null;

  userMenuItems: MenuItem [] = [
    { label: 'Reservations', icon: 'pi pi-calendar', routerLink: '/reservations' },
    { label: 'Sign Out', icon: 'pi pi-sign-out', command: () => this.authService.logout() }
  ]

  items: MenuItem [] = [
    { label: 'Home', routerLink: '/home' },
    { label: 'Rooms', routerLink: '/rooms' },
    { label: 'Attractions', routerLink: '/attractions' },
  ];

  barButtons: AppBarButton[] = [
    {
      label: 'Login',
      onClick: this.login.bind(this),
      icon: 'pi pi-user',
      shouldHide: () => this.isLoggedIn,
      class: "AppBar-rightBtn"
    },
    { label: 'Register', onClick: this.register.bind(this), icon: 'pi pi-sign-out', shouldHide: () => this.isLoggedIn },
  ];

  constructor(public authService: AuthService) {
    super();
    this.authService.currentUser$
    .pipe(takeUntil(this.destroy$))
    .subscribe((user) => {
      this.isLoggedIn = !!user;
      this.currentUser = user;
    })
  }

  register() {
    this.authService.isSignUpVisible$.next(true);
  }

  login() {
    this.authService.isLoginVisible$.next(true);
  }
}
