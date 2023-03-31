import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Service } from '../../models/service-structure.interface';

@Component({
  selector: 'app-style-card',
  templateUrl: './style-card.component.html',
  styleUrls: ['./style-card.component.scss'],
})
export class StyleCardComponent implements OnInit {
  selectedVariants:any = {};
  variantsByType:any = {};
  private totalPrice$: BehaviorSubject<number> = new BehaviorSubject(0);
  totalPrice: Observable<number> = this.totalPrice$;
  @Input('details')
  set service(raw: Service) {
    let types: any = {};

    if (raw.variants) {
      raw.variants.forEach((variant, index) => {
        if (+variant.order === 0 || index === 0) {
          this.selectedVariants = {
            ...this.selectedVariants,
            [variant.type]: variant,
          };
        }

        types = {
          ...types,
          [variant.title]: variant,
        };
        this.variantsByType = {
          ...this.variantsByType,
          [variant.type]: types,
        };
      });
    }

    console.log('selected: ', this.selectedVariants,'variants: ',this.variantsByType);
    this.calculatePrice();
  }
  // get service() {
  //   return;
  // }

  constructor() {}

  private calculatePrice() {
    const obj = this.selectedVariants,
    arr = Object.keys(obj)
    console.log(
      arr.reduce((accumulator, currVal) => {
        return accumulator + obj[currVal].price;
      }, 0)
    );
  }

  ngOnInit(): void {}
}
