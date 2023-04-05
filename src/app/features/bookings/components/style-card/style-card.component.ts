import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Service } from '../../models/service-structure.interface';

@Component({
  selector: 'app-style-card',
  templateUrl: './style-card.component.html',
  styleUrls: ['./style-card.component.scss'],
})
export class StyleCardComponent implements OnInit {
  private defaultHeight = 140;

  private $totalPrice: BehaviorSubject<number> = new BehaviorSubject(0);

  public selectedVariants: any = {};
  public variantsByType: any = {};

  public totalPrice$: Observable<number> = this.$totalPrice;
  public rawServiceData!: Service;

  @ViewChild('style') style!: ElementRef;
  @ViewChild('card') card!: ElementRef;
  @ViewChild('tray') tray!: ElementRef;

  @Input()
  set isSelected(val: boolean) {}
  get isSelected() {
    return true;
  }
  @Input('details')
  set service(val: Service) {
    this._service(val);
  }
  

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.setHostHeight = this.defaultHeight
  }

  private calculatePrice() {
    const obj = this.selectedVariants,
      arr = Object.keys(obj);
    console.log(
      arr.reduce((accumulator, currVal) => {
        return accumulator + obj[currVal].price;
      }, 0)
    );
  }

  private set setHostHeight(val: number){
    this.style.nativeElement.style.height = val + 'px';
  }

  //~~~~~~~~~~~~ helpers

  private _service(raw: Service) {
    this.rawServiceData = raw;
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

    console.log(
      'selected: ',
      this.selectedVariants,
      'variants: ',
      this.variantsByType
    );
    this.calculatePrice();
  }
}
