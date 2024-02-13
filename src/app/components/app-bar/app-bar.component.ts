import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from "@angular/router";

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
export class AppBarComponent implements OnInit {
  isLoggedIn: boolean = false;

  items: AppBarButton [] = [
    { label: 'Rooms', onClick: () => this.router.navigateByUrl('/') },
    { label: 'Attractions', onClick: () => this.router.navigateByUrl('/' )},
    { label: 'Login', onClick: this.login.bind(this), icon: 'pi pi-user', shouldHide: () => this.isLoggedIn, class: "AppBar-rightBtn" },
    { label: 'Register', onClick: this.register.bind(this), icon: 'pi pi-sign-out', shouldHide: () => this.isLoggedIn },
  ];

  userMenuItems: MenuItem[] = [
    { label: 'Bookings', icon: 'pi pi-calendar', command: () => {} },
    { label: 'Sign Out', icon: 'pi pi-sign-out', command: () => this.signOut() }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {}

  //todo:
  register() {}

  login() {
    this.isLoggedIn = true;
  }

  signOut() {
    this.isLoggedIn = false;
  }
}
