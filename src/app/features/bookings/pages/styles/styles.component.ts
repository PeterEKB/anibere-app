import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { BookingCategoriesService } from '../../services/booking-categories.service';
import { Service } from '../../models/service-structure.interface';
import { BookingStyleService } from '../../services/booking-style.service';

@Component({
  selector: 'app-styles',
  templateUrl: './styles.component.html',
  styleUrls: ['./styles.component.scss'],
})
export class StylesComponent implements OnInit, OnDestroy {
  // ~~~~~~ Variables ~~~~~~
  public expandSelectedService: boolean = false;
  public selectedService!: any;

  // ~~~~~~ Subjects ~~~~~~
  private notifier$: Subject<null> = new Subject();
  private services: Service[] | null = null;
  private servicesSub: BehaviorSubject<Service[] | null> = new BehaviorSubject(
    this.services
  );

  // ~~~~~~ Observables ~~~~~~
  public services$: Observable<Service[] | null> = this.servicesSub;

  constructor(
    private router: ActivatedRoute,
    private s_booking: BookingCategoriesService,
    private s_style: BookingStyleService
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
          this.services = (val as Service[]);
          if (typeof this.services !== 'string')
            this.servicesSub.next(this.services);
        });
    });
    this.s_style.selectedService$
    .pipe(takeUntil(this.notifier$))
    .subscribe(selected=>{
      this.selectedService = selected?selected:{ sku: '', selectedVariants: {} }
    })
  }
  stopObs() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }
  styleEventHandler(event: { event: string; value: any }) {
    switch (event.event) {
      case 'click':
        this._styleClickEvent(event.value);
        break;
      case 'expand':
    }
  }

  // ~~~~~~ Helpers  ~~~~~~

  _styleClickEvent(value: any) {
    if (value.sku === this.selectedService.sku && this.selectedService.sku)
      this.expandSelectedService = !this.expandSelectedService;
    else this.expandSelectedService = true;

    this.selectedService = value;
  }
}
