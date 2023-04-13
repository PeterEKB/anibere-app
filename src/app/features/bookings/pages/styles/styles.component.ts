import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { BookingService } from 'src/app/core/services/booking.service';
import { Service } from '../../models/service-structure.interface';

@Component({
  selector: 'app-styles',
  templateUrl: './styles.component.html',
  styleUrls: ['./styles.component.scss'],
})
export class StylesComponent implements OnInit, OnDestroy {
  notifier$: Subject<null> = new Subject();
  private services: Service[] | null = null;
  private servicesSub: BehaviorSubject<Service[] | null> = new BehaviorSubject(this.services);
  services$: Observable<Service[] | null> = this.servicesSub;
  selectedService!: string;

  constructor(
    private router: ActivatedRoute,
    private s_booking: BookingService
  ) {}
  ngOnDestroy(): void {
    this.stopObs();
  }

  ngOnInit(): void {
    this.router.params.pipe(takeUntil(this.notifier$)).subscribe((params) => {
      this.s_booking
        .getServices(params['category'])
        .pipe(takeUntil(this.notifier$))
        .subscribe((val) => {
          console.log(val)
          this.services = val
          if(typeof this.services !== 'string')
          this.servicesSub.next(this.services);
          console.log(val)
        });
    });
  }
  stopObs() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }
  styleEventHandler(event:{event: string, value: string}){
    switch(event.event){
      case 'click': this.selectedService = event.value; 
      console.log(this.selectedService, event.value)
      break;
    }
  }
}
