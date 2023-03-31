import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.scss'],
  providers: [DatePipe]
})
export class AppointmentCardComponent implements OnInit {
  cardInfo: AppointmentCard = {
    date: new Date(),
    service: {
      name: 'Bohemian box braids',
      time: 360,
    },
    status: 'upcoming',
  };
  get endTime() {
    if (['fulfilled','upcoming'].includes(this.cardInfo.status))
      return this.datePipe.transform(
        new Date(
          this.cardInfo.date.getTime() + this.cardInfo.service.time * 60000
        ),
        'HH:mm'
      );
      return '—';
  }

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {}
}

export interface AppointmentCard {
  date: Date;
  service: {
    name: string;
    time: number;
  };
  status: string;
}
