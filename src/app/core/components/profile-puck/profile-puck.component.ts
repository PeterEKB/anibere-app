import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-puck',
  templateUrl: './profile-puck.component.html',
  styleUrls: ['./profile-puck.component.scss'],
})
export class ProfilePuckComponent implements OnInit, OnDestroy {
  @ViewChild('img')
  _img!: ElementRef;
  private notifier$ = new Subject();

  profile!: User;
  styles = {
    cover: {
      rotated: false,
    }
  };

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.initUser();
  }
  ngAfterViewInit() {
    this.imageLoaded();
    this.imageError();

  }
  ngOnDestroy() {
    this.notifier$.unsubscribe();
    this.stopObs();
  }

  //* Helpers */

  private initUser() {
    this.userService.user$
      .pipe(
        takeUntil(this.notifier$),
        tap((x) => {
          this.profile = x;
        })
      )
      .subscribe();
  }
  private imageLoaded() {
    this._img.nativeElement.onload = () => {
      this.styles.cover.rotated = true;
    };
  }
  private imageError() {
    this._img.nativeElement.onerror = () => {
      this.styles.cover.rotated = false;
    };
  }
  private stopObs() {
    this.notifier$.next(null);
    this.notifier$.complete();
  }
}
