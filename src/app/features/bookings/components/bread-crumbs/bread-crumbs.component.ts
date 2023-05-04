import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { breadFormat } from '../../models/breadCrumbs';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss'],
})
export class BreadCrumbsComponent implements OnInit {
  @Input()
  format: breadFormat = {
    back: true,
    category: 'cat',
    first: {
      name: 'first',
      link: 'test',
      active: true,
    },
    second: {
      name: 'second',
      link: 'test',
      active: true,
    },
    calendar: true,
  };
  constructor(private location: Location, private s_calendar: CalendarService) {}

  ngOnInit(): void {}

  updateCalendarView(value: boolean) {
    this.s_calendar.updateCalendarView(value);
  }

  goBack() {
    this.location.back();
  }
}
