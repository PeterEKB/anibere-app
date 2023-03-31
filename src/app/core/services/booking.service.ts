import { Injectable, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  from,
  map,
  Observable,
  Subject,
  take,
  tap,
} from 'rxjs';
import { Category, Service } from 'src/app/features/bookings/models/service-structure.interface';
import { BookingApiService } from './apis/booking-api.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private selectedSub: BehaviorSubject<string> = new BehaviorSubject('');
  private categories: Category[] = [];
  private categoriesSub: BehaviorSubject<Category[]> = new BehaviorSubject(
    this.categories
  );
  selected$: Observable<string> = this.selectedSub;
  categories$: Observable<Category[]> = this.categoriesSub;

  constructor(private a_booking: BookingApiService) {
    this.initCategories();
  }

  setSelected(val: string) {
    this.selectedSub.next(val);
  }
  getServices(sku: string) {
    this.setSelected(sku);
    let cached = false,
      index = this.categories.findIndex((curr) => {
        if (curr.sku === sku) {
          if (curr.services) cached = true;
          return true;
        } else {
          return false;
        }
      });

    if (cached)
      return from([this.categories[index].services]).pipe(tap(console.log));
    return this.a_booking.getStyles(sku).pipe(
      take(1),
      tap((val) => {
        if (this.categories)
          this.categories[index] = {
            ...this.categories[index],
            services: (val as { results: Service[] }).results,
          };
      }),
      map((orig) => {
        return (orig as { results: Service[] }).results;
      })
    );
  }
  initCategories() {
    if (this.categories.length) {
      this.categoriesSub.next(this.categories);
    } else {
      this.a_booking
        .getCategories()
        .pipe(take(1))
        .subscribe((val) => {
          this.categories = (val as { results: Category[] }).results;
          this.categoriesSub.next(this.categories);
        });
    }
  }
}
