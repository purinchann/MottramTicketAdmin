import { Component, VERSION } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'MottramTicketAdmin';
  currentVersion = VERSION;

  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
