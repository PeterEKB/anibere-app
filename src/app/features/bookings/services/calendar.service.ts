import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private $calendarView: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public calendarView$: Observable<boolean> = this.$calendarView;

  constructor() {}

  public updateCalendarView(value: boolean) {
    this.$calendarView.next(value);
  }
}
