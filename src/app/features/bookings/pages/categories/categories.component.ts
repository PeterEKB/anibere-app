import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { BookingService } from 'src/app/core/services/booking.service';
import { Category } from '../../models/service-structure.interface';

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
    private s_booking: BookingService,
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
    // this.s_booking.setSelected(sku);
    this.s_booking.getServices(sku).pipe(take(1)).subscribe(() => {
      this.router.navigate([`../${sku}`], {
        relativeTo: this.activatedRoute,
      });
    });
  }
}
