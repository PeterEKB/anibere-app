import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss'],
})
export class CollapsibleComponent implements OnInit, AfterViewInit, OnDestroy {
  private defaultHeight = 50;
  public collapsed: boolean = true;
  notifier$: Subject<null> = new Subject();

  @Input('materialIcon')
  icon: string = 'token';
  @Input()
  title: string = 'Title';
  @Input()
  collapse: boolean = true;

  @ViewChild('container')
  private container!: ElementRef;
  @ViewChild('heading')
  private heading!: ElementRef;
  @ViewChild('body')
  private body!: ElementRef;

  private headingClick$!: Observable<Event>;

  constructor() {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.headingClick$ = fromEvent(this.heading.nativeElement, 'click');
    this.containerHeight = this.defaultHeight;
    this.headingClick$.pipe(takeUntil(this.notifier$)).subscribe((_) => {
      this.collapsed ? this.expandContainer() : this.collapseContainer();
      this.collapsed = !this.collapsed;
    });
  }
  ngOnDestroy(): void {
    this.stopObs()
  }
  stopObs() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

  private set containerHeight(val: number) {
    this.container.nativeElement.style.height = val + 'px';
  }
  private get containerHeight() {
    return this.container.nativeElement.offsetHeight;
  }
  private set bodyHeight(val: number) {
    this.container.nativeElement.style.height = val + 'px';
  }
  private get bodyHeight() {
    return this.body.nativeElement.offsetHeight;
  }

  private expandContainer() {
    this.containerHeight = this.defaultHeight + this.bodyHeight;
  }
  private collapseContainer() {
    this.containerHeight = this.defaultHeight;
  }
}
