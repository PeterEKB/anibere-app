import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { CalendarGuard } from 'src/app/core/guards/calendar.guard';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  currentPage = 'styles';
  canActivate$?: Observable<boolean>;

  constructor(private router: Router, private g_calendar: CalendarGuard) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentPage = (event as NavigationEnd).urlAfterRedirects.split(
          '/'
        )[2];
      });
  }

  ngOnInit(): void {
    this.canActivate$ = this.g_calendar.canActivate$
  }
}
