import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterState,
} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  page: string | undefined = '';

  constructor(private title: Title, private router: Router) {}

  ngOnInit(): void {
    this.page = this.title.getTitle().split(' | ')[1];
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.router.titleStrategy?.updateTitle(this.router.routerState.snapshot)
        this.page = this.title.getTitle().split(' | ')[1];
      });
  }
}
