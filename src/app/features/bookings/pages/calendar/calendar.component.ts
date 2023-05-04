import { WeekDay } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  public activeDateIndex: number = 0;
  public upperDateLimit: number = 2;
  public lowerDateLimit: number = 0;
  public calendarView$!: Observable<boolean>;

  public daysOfWeek: string[] = Object.values(WeekDay).slice(0, 7) as string[];
  public currentDate: Date = new Date();
  public currentDateInfo: any = {
    monthIndex: this.currentDate.getMonth(),
    month: this.currentDate.getMonth() + 1,
    year: this.currentDate.getFullYear(),
    today: this.currentDate.getDate(),
    daysInMonth: this.getDaysInMonth(
      this.currentDate.getMonth(),
      this.currentDate.getFullYear()
    ),
    firstDayOfMonth: new Date(
      this.currentDate.getMonth(),
      this.currentDate.getFullYear(),
      1
    ).getDay(),
  };
  public activeDate: Date = new Date(
    `${this.currentDateInfo.month + this.activeDateIndex}
    '/'${this.currentDateInfo.today}
    '/'${this.currentDateInfo.year}`
  );
  public $calendar: BehaviorSubject<any> = new BehaviorSubject({
    monthIndex: this.activeDate.getMonth(),
    month: this.activeDate.getMonth() + 1,
    year: this.activeDate.getFullYear(),
    daysInMonth: this.getDaysInMonth(
      this.activeDate.getMonth(),
      this.activeDate.getFullYear()
    ),
    firstDayOfMonth: new Date(
      this.activeDate.getMonth(),
      this.activeDate.getFullYear(),
      1
    ).getDay(),
  });
  public calendar$: Observable<any> = this.$calendar;

  constructor(private s_calendar: CalendarService) {
    this.calendarView$ = this.s_calendar.calendarView$;
  }

  ngOnInit(): void {

  }

  getDaysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }
  paginateMonths(direction: string | number) {
    const forward: Array<string | number> = ['next', 'nxt', 1],
      backward: Array<string | number> = ['previous', 'prev', 'prv', -1];

    if (
      forward.includes(direction) &&
      this.activeDateIndex < this.upperDateLimit
    ) {
      this.activeDateIndex++;
      console.log(this.activeDateIndex);
    } else if (
      backward.includes(direction) &&
      this.activeDateIndex > this.lowerDateLimit
    ) {
      this.activeDateIndex--;
      console.log(this.activeDateIndex);
    }
    this.updateActiveDate();
  }
  updateActiveDate() {
    this.activeDate = new Date(
      `${this.currentDateInfo.month + this.activeDateIndex}
      '/'${this.currentDateInfo.today}
      '/'${this.currentDateInfo.year}`
    );
    this.$calendar.next({
      monthIndex: this.activeDate.getMonth(),
      month: this.activeDate.getMonth() + 1,
      year: this.activeDate.getFullYear(),
      daysInMonth: this.getDaysInMonth(
        this.activeDate.getMonth(),
        this.activeDate.getFullYear()
      ),
      firstDayOfMonth: new Date(
        this.activeDate.getMonth(),
        this.activeDate.getFullYear(),
        1
      ).getDay(),
    });
  }
  public getDayOfTheWeek(day: number): string {
    let date: Date = new Date(
        this.activeDate.getFullYear(),
        this.activeDate.getMonth(),
        day
      ),
      dayOfWeek: number = date.getDay();

    return this.daysOfWeek[dayOfWeek];
  }
}
