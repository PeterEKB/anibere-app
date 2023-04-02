import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { breadFormat } from '../../models/breadCrumbs';
import { CalendarComponent } from '../calendar/calendar.component';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  component = CategoriesComponent
  notifier$: Subject<null> = new Subject();
  private urlArray: string[] = [''];
  bCrumbsFormat: breadFormat = {
    back: false,
    category: 'styles',
    first: {
      name: 'category',
      link: 'styles/categories',
      active: true,
    },
  };
  private crumbFormats: breadFormat[] = [
    //^ For Styles state [0]
    {
      back: false,
      category: 'styles',
      first: {
        name: 'category',
        link: 'styles/categories',
        active: true,
      },
      second: {
        name: 'style',
        link: 'styles/style',
        active: false,
      },
    },
    //^ For Calendar state [1]
    {
      back: false,
      category: 'calendar',
      first: {
        name: 'day',
        link: 'calendar/day',
        active: true,
      },
      second: {
        name: 'time',
        link: 'calendar/time',
        active: false,
      },
    },
    //^ For Confirmation state [2]
    {
      back: false,
      category: 'confirm',
      first: {
        name: 'review',
        link: 'confirm/review',
        active: true,
      },
      second: {
        name: 'finalize',
        link: 'confirm/finalize',
        active: false,
      },
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.createUrlArray();
    this.updateCrumbs();
    this.trackNavigation();
  }
  ngOnDestroy(): void {
    this.stopObs();
  }

  private updateCrumbs() {
    switch (this.urlArray[0]) {
      case 'styles':
        this.handleStyles();
        break;
      case 'calendar':
        this.handleCalendar();
        break;
      case 'confirm':
        this.handleConfirm();
        break;
    }
  }
  private handleStyles() {
    switch (this.urlArray[1]) {
      case 'categories':
        this.useCategoryFormat();
        break;
      default:
        this.useStyleFormat();
        break;
    }
  }
  private handleCalendar() {
    switch (this.urlArray[1]) {
      case 'time':
        this.useTimeFormat();
        break;
      default:
        this.useDayFormat();
        break;
    }
  }
  private handleConfirm() {
    switch (this.urlArray[2]) {
      case 'finalize':
        this.useFinalizeFormat();
        break;
      default:
        this.useReviewFormat();
        break;
    }
  }
  private useCategoryFormat() {
    this.bCrumbsFormat = { ...this.crumbFormats[0] };
    this.bCrumbsFormat.back = false;
    this.bCrumbsFormat.second!.active = false;
  }
  private useStyleFormat() {
    this.bCrumbsFormat = { ...this.crumbFormats[0] };
    this.bCrumbsFormat.back = true;
    this.bCrumbsFormat.second!.active = true;
  }
  private useDayFormat() {
    this.bCrumbsFormat = { ...this.crumbFormats[1] };
    this.bCrumbsFormat.back = false;
    this.bCrumbsFormat.second!.active = false;
  }
  private useTimeFormat() {
    this.bCrumbsFormat = { ...this.crumbFormats[1] };
    this.bCrumbsFormat.back = true;
    this.bCrumbsFormat.second!.active = true;
  }
  private useReviewFormat() {
    this.bCrumbsFormat = { ...this.crumbFormats[2] };
    this.bCrumbsFormat.back = false;
    this.bCrumbsFormat.second!.active = false;
  }
  private useFinalizeFormat() {
    this.bCrumbsFormat = { ...this.crumbFormats[2] };
    this.bCrumbsFormat.back = true;
    this.bCrumbsFormat.second!.active = true;
  }
  private trackNavigation() {
    this.router.events.pipe(takeUntil(this.notifier$)).subscribe((events) => {
      if (events instanceof NavigationEnd) {
        this.createUrlArray();
        this.updateCrumbs();
      }
    });
  }
  private createUrlArray() {
    let tmp = this.router.url.split('/');
    this.urlArray = tmp.slice(2);
  }
  stopObs() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }
}
