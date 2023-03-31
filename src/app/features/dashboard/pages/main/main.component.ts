import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  user$!: Observable<User>;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.user$ = new Observable((observer) => {
      this.userService.user$.subscribe((x) => {
        observer.next(x);
      });
    });
  }
}
