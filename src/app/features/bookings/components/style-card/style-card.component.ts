import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Service,
  Variant,
  Options,
} from '../../models/service-structure.interface';

@Component({
  selector: 'app-style-card',
  templateUrl: './style-card.component.html',
  styleUrls: ['./style-card.component.scss'],
})
export class StyleCardComponent implements OnInit {
  private defaultHeight = 140;
  private serviceVal!: Service;
  private _isSelected: boolean = false;

  private $totalPrice: BehaviorSubject<number> = new BehaviorSubject(0);
  private cardClick$!: Observable<Event>;

  public selectedVariants: any = {};

  public set setHostHeight(val: number) {
    this._setHostHeight = val;
  }

  public get trayHeight() {
    return this.tray.nativeElement.offsetHeight;
  }
  public get isSelected() {
    return true;
  }
  public get service(): Service {
    return this.serviceVal;
  }

  public totalPrice$: Observable<number> = this.$totalPrice;

  @ViewChild('style') container!: ElementRef;
  @ViewChild('card') card!: ElementRef;
  @ViewChild('tray') tray!: ElementRef;

  @Input()
  set isSelected(val: boolean) {}
  @Input('details')
  set service(val: Service) {
    this._service(val);
  }

  @Output() clicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.setHostHeight =
      this.isSelected && this.tray
        ? this.defaultHeight + this.trayHeight
        : this.defaultHeight;
  }

  private calculatePrice() {
    const obj = this.selectedVariants,
      arr = Object.keys(obj),
      price =
        arr.reduce((accumulator, currVal) => {
          return accumulator + obj[currVal].price;
        }, 0) ||
        this.service.price ||
        -1;
    this.$totalPrice.next(price);
    console.log(price);
  }

  //~~~~~~~~~~~~ helpers

  private set _setHostHeight(val: number) {
    this.container.nativeElement.style.height = val + 'px';
  }
  private _service(raw: Service) {
    this.serviceVal = raw;

    const variants: Variant[] | undefined = raw.variants;

    if (raw.variants) {
      raw.variants.forEach((variant, index) => {
        if (variant.options) {
          variant.options.forEach((option, index) => {
            if (+option.order === 0 || index === 0) {
              this.selectedVariants = {
                ...this.selectedVariants,
                [variant.type]: {
                  ...option,
                  detailOrder: variant.order,
                  altValue: variant.altVal?[variant.altVal?.false, variant.altVal?.true]:[],
                },
              };
            }
          });
        }
      });
    }

    console.log('selected: ', this.selectedVariants);
    this.calculatePrice();
  }
}
