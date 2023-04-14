import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Query,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
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
  private _expand: boolean = false;

  private $totalPrice: BehaviorSubject<number> = new BehaviorSubject(0);
  private cardClick$!: Observable<Event>;
  private cardResize$!: Observable<Event>;

  public trayState: 'expand' | 'collapse' = 'collapse';
  public selectedVariants: any = {};

  public set setHostHeight(val: number) {
    this._setHostHeight = val;
  }

  public get trayHeight() {
    return this.tray.nativeElement.offsetHeight;
  }
  public get isSelected() {
    return this._isSelected;
  }
  public get expand() {
    return this._expand;
  }
  public get service(): Service {
    return this.serviceVal;
  }

  public totalPrice$: Observable<number> = this.$totalPrice;

  @ViewChild('style') container!: ElementRef;
  @ViewChild('card') card!: ElementRef;
  @ViewChild('tray') tray!: ElementRef;
  @ViewChildren('descriptor') descriptor!: QueryList<ElementRef>;

  @Input()
  set expand(val: boolean) {
    this._expand = val;
    this.handleTray();
  }
  @Input()
  set select(val: boolean) {
    this._isSelected = val;
  }
  @Input('details')
  set service(val: Service) {
    this._service(val);
  }

  @Output() clicked: EventEmitter<{ event: string; value: string }> =
    new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.trayInit();
    this.seperateDescriptors();

    this.cardClick$ = fromEvent(this.card.nativeElement, 'click');
    this.cardResize$ = fromEvent(this.card.nativeElement, 'resize');

    this.cardClick$.subscribe((_) => {
      this.emitClick();
      console.log('card clicked');
    });
    this.cardResize$.subscribe((_) => {
      this.seperateDescriptors();
    });
  }

  seperateDescriptors() {
    this.descriptor.forEach((_element) => {
      let element = _element.nativeElement,
        left = element.offsetLeft;

      if (left === 32) {
        // element.classList.remove('seperate-left');
      } else {
      console.log(element,left);
        element.classList.add('seperate-left');
      }
    });
  }
  emitClick() {
    this.clicked.emit({ event: 'click', value: this.service.sku });
  }
  trayInit() {
    this.expand && this.tray
      ? this.updateTray('expand')
      : this.updateTray('collapse');
  }
  handleTray() {
    this.expand && this.tray
      ? this.updateTray('expand')
      : this.updateTray('collapse');
  }
  private calculatePrice() {
    const obj = this.selectedVariants,
      arr = Object.keys(obj),
      price = this._calculatePriceReducer(arr, obj) || this.service.price || -1;
    this.$totalPrice.next(price);
    console.log(price);
  }
  private expandTray() {
    this.setHostHeight = this.defaultHeight + this.trayHeight;
    this.trayState = 'expand';
  }
  private collapseTray() {
    this.setHostHeight = this.defaultHeight;
    this.trayState = 'collapse';
  }

  private toggleTray() {
    if (this.trayState === 'expand') {
      this.updateTray('collapse');
    } else {
      this.updateTray('expand');
    }
  }

  updateTray(state: string = 'toggle') {
    const allowedOpenStates = 'expand' || 'open' || 'show' || 'opentray',
      allowedCloseStates = 'collapse' || 'close' || 'hide' || 'closetray',
      allowedToggleStates = 'toggle' || 'toggletray';
    switch (state.toLowerCase()) {
      case allowedOpenStates:
        this.expandTray();
        break;
      case allowedCloseStates:
        this.collapseTray();
        break;
      case allowedToggleStates:
        this.toggleTray();
        break;
      default:
        break;
    }
  }
  variantSelected(variant: Variant, option: Options) {
    this.setVariant(variant, option);
    this.seperateDescriptors();
  }
  setVariant(variant: Variant, option: Options) {
    this.selectedVariants = {
      ...this.selectedVariants,
      [variant.type]: {
        ...option,
        detailOrder: variant.order,
        altValue: variant.altVal
          ? [variant.altVal?.false, variant.altVal?.true]
          : [],
      },
    };
  }

  //~~~~~~~~~~~~ helpers

  _calculatePriceReducer(arr: string[], obj: any) {
    return arr.reduce((accumulator, currVal) => {
      return accumulator + obj[currVal].price;
    }, 0);
  }
  private set _setHostHeight(val: number) {
    console.log(this.container);
    if (this.container) {
      this.container.nativeElement.style.height = val + 'px';
    }
  }
  private _service(raw: Service) {
    this.serviceVal = raw;

    if (raw.variants) {
      raw.variants.forEach((variant, index) => {
        if (variant.options) {
          variant.options.forEach((option, index) => {
            if (+option.order === 0 || index === 0) {
              this.setVariant(variant, option);
            }
          });
        }
      });
    }

    console.log('selected: ', this.selectedVariants);
    this.calculatePrice();
  }
}
