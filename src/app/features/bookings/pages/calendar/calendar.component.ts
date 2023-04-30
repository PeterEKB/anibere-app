import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  public currentDate: Date = new Date();
  public activeDate: Date = new Date();
  //an array of days of the week
  public daysOfWeek: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  public currentDateInfo: any = {
    month: this.currentDate.getMonth(),
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
  public calendar: any = {
    month: this.activeDate.getMonth(),
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
  };

  constructor() {}

  ngOnInit(): void {}

  getDaysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }
}
