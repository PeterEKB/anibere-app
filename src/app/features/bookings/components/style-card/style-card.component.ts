import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  fromEvent,
  takeUntil,
  Subject,
  take,
  switchMap,
  of,
} from 'rxjs';
import {
  Service,
  Variant,
  Option,
} from '../../models/service-structure.interface';
import { StyleCardClicked } from '../../models/style-card-clicked';
import { BookingStyleService } from '../../services/booking-style.service';

@Component({
  selector: 'app-style-card',
  templateUrl: './style-card.component.html',
  styleUrls: ['./style-card.component.scss'],
})
export class StyleCardComponent implements OnInit {
  private defaultHeight = 150;
  private serviceVal!: Service;
  private _isSelected: boolean = false;
  private _expand: boolean = false;

  private notifier$: Subject<null> = new Subject();
  private $totalPrice: BehaviorSubject<number> = new BehaviorSubject(0);
  private cardClick$!: Observable<Event>;

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

  @Output() clicked: EventEmitter<StyleCardClicked> = new EventEmitter();

  constructor(
    private s_style: BookingStyleService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.card.nativeElement.style.height = `${this.defaultHeight - 1.5}px`;
    this.trayInit();

    this.cardClick$ = fromEvent(this.card.nativeElement, 'click');

    this.cardClick$.pipe(takeUntil(this.notifier$)).subscribe((event) => {
      this.emitClick(event);
    });
  }
  ngOnDestroy(): void {
    this.stopObs();
  }
  stopObs() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

  variantSelected(variant: Variant, option: Option) {
    this.setVariant(variant, option);
    this.calculatePrice();
  }
  setVariant(variant: Variant, option: Option) {
    this.selectedVariants[variant.type] = {
      ...option,
      detailOrder: variant.order,
      altValue: variant.altVal
        ? [variant.altVal?.false, variant.altVal?.true]
        : [],
    };
    return true;
  }
  emitClick(event: Event) {
    this.clicked.emit({
      event: 'click',
      value: {
        sku: this.service.sku,
        selectedVariants: this.selectedVariants,
      },
      nativeEvent: event,
    });
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
  commitSelections() {
    this.s_style.setSelected(this.service, this.selectedVariants);
    this.router.navigate([`bookings/calendar`], { relativeTo: null });
  }

  //~~~~~~~~~~~~ helpers

  _calculatePriceReducer(arr: string[], obj: any) {
    return arr.reduce((accumulator, currVal) => {
      return accumulator + obj[currVal].price;
    }, 0);
  }
  private set _setHostHeight(val: number) {
    if (this.container) {
      this.container.nativeElement.style.height = val + 'px';
    }
  }
  private _service(raw: Service) {
    this.serviceVal = raw;

    this.s_style.selectedService$
      .pipe(
        take(1),
        switchMap((selected) => {
          if (selected && selected.sku === raw.sku) {
            return this.s_style.selectedVariants$;
          } else return of(null);
        })
      )
      .subscribe((selectedVariants) => {
        if (selectedVariants) {
          this.selectedVariants = selectedVariants;
        } else {
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
        }
      });

    this.calculatePrice();
  }

  // Experimental
  /*

// Seperate descriptors with "•" if the descriptor isn't
// the first in the row.


  // private cardResize$!: Observable<Event>;

  // @ViewChildren('descriptor') descriptor!: QueryList<ElementRef>;

  // ngAfterViewInit() {
    // this.cardResize$ = fromEvent(this.card.nativeElement, 'resize');
    // if (this.tray) this.seperateDescriptors();
    // this.cardResize$.subscribe((_) => {
      // this.seperateDescriptors();
    // });
  // }

  // variantSelected(variant: Variant, option: Option) {
  //   let variantSet = this.setVariant(variant, option);
  //   this.calculatePrice();
    // asyncScheduler.schedule(() => {
    //   this.seperateDescriptors();
    // });
  // }
  

  seperateDescriptors() {
    this.descriptor.forEach((_element,index) => {
      let element = _element.nativeElement,
        left = Math.floor(element.offsetLeft),
        parentLeft = Math.floor(
          element.parentElement.getBoundingClientRect().left
        );

        if (left === parentLeft) {
        console.log('first',index, left, parentLeft);
        this.renderer.addClass(element, 'first-in-row');
      } else {
        console.log('not first',index, left, parentLeft);
        this.renderer.removeClass(element, 'first-in-row');
      }
    });
  }
  */
}
