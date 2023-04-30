import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Category } from '../../models/service-structure.interface';
import { BookingCategoriesService } from '../../services/booking-categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  selected: string = '';
  categories$: Observable<Category[]> = this.s_booking.categories$;

  private notifier$ = new Subject();

  constructor(
    private s_booking: BookingCategoriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.s_booking.selected$
      .pipe(takeUntil(this.notifier$))
      .subscribe((val) => (this.selected = val));
  }
  ngOnDestroy() {
    this.stopObs();
  }
  stopObs() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

  select(sku: string) {
    this.s_booking.getServices(sku).pipe(take(1)).subscribe(() => {
    this.s_booking.setSelected(sku);
      this.router.navigate([`../${sku}`], {
        relativeTo: this.activatedRoute,
      });
    });
  }
}
