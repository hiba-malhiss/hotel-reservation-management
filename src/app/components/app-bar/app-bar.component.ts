import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService, User } from "../../services/auth.service";

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
export class AppBarComponent {
  isLoggedIn: boolean = false;
  currentUser: User | null = null;

  userMenuItems: MenuItem [] = [
    { label: 'Bookings', icon: 'pi pi-calendar', routerLink: '/' },
    { label: 'Sign Out', icon: 'pi pi-sign-out', command: () => this.authService.logout() }
  ]

  items: MenuItem [] = [
    { label: 'Home', routerLink: '/' },
    { label: 'Rooms', routerLink: '/rooms' },
    { label: 'Attractions', routerLink: '/attractions' },
  ];

  barButtons : AppBarButton[]= [
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
    this.authService.currentUser$.subscribe((user) => {
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
