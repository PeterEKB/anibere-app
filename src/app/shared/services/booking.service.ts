import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BookingCategoriesService } from 'src/app/features/bookings/services/booking-categories.service';
import { BookingStyleService } from 'src/app/features/bookings/services/booking-style.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private selectedCategorySub: BehaviorSubject<string> = new BehaviorSubject(
    ''
  );
  private isSelected_CategorySub: BehaviorSubject<boolean> =
    new BehaviorSubject(false);
  private selectedServiceSub: BehaviorSubject<any> = new BehaviorSubject({});
  private isSelected_ServiceSub: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  private selectedVariantsSub: BehaviorSubject<any> = new BehaviorSubject({});
  private isSelected_VariantsSub: BehaviorSubject<boolean> =
    new BehaviorSubject(false);

  public isSelected_Category$: Observable<boolean> =
    this.isSelected_CategorySub;
  public selectedCategory$: Observable<string> = this.selectedCategorySub;
  public isSelected_Service$: Observable<boolean> = this.isSelected_ServiceSub;
  public selectedService$: Observable<string> = this.selectedServiceSub;
  public isSelected_Variants$: Observable<boolean> =
    this.isSelected_VariantsSub;
  public selectedVariants$: Observable<string> = this.selectedVariantsSub;

  constructor(
    private s_style: BookingStyleService,
    private s_booking: BookingCategoriesService
  ) {
    this.setSelectedCategory();
    this.setSelectedService();
  }

  ngOnInit() {}

  private setSelectedCategory() {
    this.s_booking.selected$.subscribe((selected: string) => {
      this.selectedCategorySub.next(selected);
      let isSelected: boolean = selected ? true : false;
      this.isSelected_CategorySub.next(isSelected);
    });
  }
  private setSelectedService() {
    this.s_style.selectedService$.subscribe((selected: string) => {
      this.selectedServiceSub.next(selected);
      let isSelected: boolean = selected ? true : false;
      this.isSelected_ServiceSub.next(isSelected);
    });
    this.s_style.selectedVariants$.subscribe((selected: string) => {
      this.selectedVariantsSub.next(selected);
      let isSelected: boolean = selected ? true : false;
      this.isSelected_VariantsSub.next(isSelected);
    });
  }
}
