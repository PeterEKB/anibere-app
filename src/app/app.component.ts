import { Component } from '@angular/core';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loginClasses = {
    slide: false,
  };
  constructor(private readonly user: UserService) {
    user.user$.subscribe((val) => {
      val.id
        ? (this.loginClasses.slide = true)
        : (this.loginClasses.slide = false);
    });
  }
}
