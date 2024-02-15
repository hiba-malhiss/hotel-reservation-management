import { Component } from '@angular/core';
import { take } from "rxjs";
import { AuthService } from "./services/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public authService: AuthService) {
    this.authService.fetchUser().pipe(take(1)).subscribe();
  }
}
