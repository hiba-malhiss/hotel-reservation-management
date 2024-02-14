import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from "@angular/router";
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

  items: AppBarButton [] = [
    { label: 'Rooms', onClick: () => this.router.navigateByUrl('/rooms') },
    { label: 'Attractions', onClick: () => this.router.navigateByUrl('/attractions') },
    {
      label: 'Login',
      onClick: this.login.bind(this),
      icon: 'pi pi-user',
      shouldHide: () => this.isLoggedIn,
      class: "AppBar-rightBtn"
    },
    { label: 'Register', onClick: this.register.bind(this), icon: 'pi pi-sign-out', shouldHide: () => this.isLoggedIn },
  ];

  userMenuItems: MenuItem[] = [
    {
      label: 'Bookings', icon: 'pi pi-calendar', command: () => {
      }
    },
    { label: 'Sign Out', icon: 'pi pi-sign-out', command: () => this.authService.logout() }
  ];

  constructor(private router: Router, public authService: AuthService) {
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
