import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { User } from '../models/user';
import { UserAPIService } from './apis/user-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$!: Observable<User>;
  #userInfo$: BehaviorSubject<User> = new BehaviorSubject({ id: '' });

  constructor(private api: UserAPIService, private router: Router) {
    this.initProfile();
  }
  signIn(username: string, password: string) {
    return this.api.validateUser(username, password).pipe(
      map((value) => {
        if (typeof value !== 'string') {
          this.#userInfo$.next(value);
          this.router.navigate(['dashboard']);
          return true;
        }
        return false;
      })
    );
  }
  private initProfile() {
    this.user$ = new Observable((observer) => {
      this.#userInfo$.subscribe((val) => {
        observer.next(val);
        observer.next({id: '1', name:{first: 'Jane', last: 'js'}, image: 'assets/images/JaneDoe.png'});
      });
    });
    //^ if (localStorage.getItem('token')) this.findById('testuser01');
  }
  private findById(id: string) {
    this.api.reqUser(id).pipe(take(1)).subscribe();
  }
}
