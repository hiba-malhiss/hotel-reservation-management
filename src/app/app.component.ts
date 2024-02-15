import { Component } from '@angular/core';
import { AuthService } from "./services/auth.service";
import { take } from "rxjs";

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
