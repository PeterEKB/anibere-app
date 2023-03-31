import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  private loggedin: boolean = false;

  constructor(private readonly userService: UserService) {}

  canActivate(
    Route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.userService.user$.subscribe((val) => {
      let send: boolean = val.id ? true : false;
      this.loggedin = send;
    });
    return this.loggedin;
  }
}
