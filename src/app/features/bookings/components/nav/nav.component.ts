import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CalendarComponent } from '../../pages/calendar/calendar.component';
import { CategoriesComponent } from '../../pages/categories/categories.component';
import { ConfirmationComponent } from '../../pages/confirmation/confirmation.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  currentPage = 'styles';
  componentList = {
    confirm: ConfirmationComponent,
  };
  calendar = CalendarComponent
  styles = CategoriesComponent

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentPage = (event as NavigationEnd).urlAfterRedirects.split(
          '/'
        )[2];
        console.log(this.currentPage)
      });
  }

  ngOnInit(): void {}
}
