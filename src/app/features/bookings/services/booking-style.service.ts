import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Service, VariantAlt } from '../models/service-structure.interface';

@Injectable({
  providedIn: 'root'
})
export class BookingStyleService {
  private selectedServiceSub: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private selectedVariantsSub: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public selectedService$: Observable<any> = this.selectedServiceSub
  public selectedVariants$: Observable<any> = this.selectedVariantsSub

  constructor() { }

  setSelected(service: Service,  variants: VariantAlt){
    this.selectedServiceSub.next(service)
    this.selectedVariantsSub.next(variants)
  }
}
