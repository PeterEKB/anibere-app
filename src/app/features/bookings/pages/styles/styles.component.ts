import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  asapScheduler,
  asyncScheduler,
  BehaviorSubject,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { BookingCategoriesService } from '../../services/booking-categories.service';
import { Service } from '../../models/service-structure.interface';
import { BookingStyleService } from '../../services/booking-style.service';
import { StyleCardClicked } from '../../models/style-card-clicked';
import { AsapScheduler } from 'rxjs/internal/scheduler/AsapScheduler';

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
          this.services = val as Service[];
          if (typeof this.services !== 'string')
            this.servicesSub.next(this.services);
        });
    });
    this.s_style.selectedService$
      .pipe(takeUntil(this.notifier$))
      .subscribe((selected) => {
        this.selectedService = selected
          ? selected
          : { sku: '', selectedVariants: {} };
      });
  }
  stopObs() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }
  styleEventHandler(event: StyleCardClicked) {
    (asapScheduler as any).schedule(this.scrollToService, 0, event.nativeEvent);
    (asyncScheduler as any).schedule(
      this._styleEventHandler_Switch,
      200,
      event
    );
  }
  public scrollToService = (event: Event) => {
    let target: HTMLElement = event.target as HTMLElement;
    console.log(target, event);

    target.scrollIntoView({
      behavior: 'smooth',
    });
  };

  // ~~~~~~ Helpers  ~~~~~~

  private _styleEventHandler_Switch = (event: StyleCardClicked) => {
    console.log(event);
    switch (event.event) {
      case 'click':
        this._styleClickEvent(event.value);
        break;
    }
  };
  private _styleClickEvent = (value: any) => {
    if (value.sku === this.selectedService.sku && this.selectedService.sku)
      this.expandSelectedService = !this.expandSelectedService;
    else this.expandSelectedService = true;

    this.selectedService = value;
  };
}
