import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { BookingService } from 'src/app/shared/services/booking.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarGuard implements CanActivate {
  public canActivate$: Observable<boolean>;

  constructor(private s_booking: BookingService, private router: Router){
    this.canActivate$ = this.s_booking.isSelected_Service$;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      let routerAction!: boolean|UrlTree;
      this.s_booking.selectedVariants$.pipe(take(1)).subscribe((data) => {
        routerAction = data
          ? true
          : (routerAction = this.router.createUrlTree(['/bookings']));
      });
    return routerAction;
  }


}
