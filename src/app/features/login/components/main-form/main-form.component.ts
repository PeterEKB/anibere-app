import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil, tap } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
})
export class MainFormComponent implements OnInit, OnDestroy {
  user!: User;
  #nameValid: boolean = false;
  #passValid: boolean = false;
  #nameValue: string = '';
  #passValue: string = '';
  passInClasses = {
    invalid: false,
  };
  private notifier$ = new Subject();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.pipe(takeUntil(this.notifier$)).subscribe((x) => {
      this.user = { ...x };
    });
  }
  ngOnDestroy(): void {
    this.stopObs();
  }

  validateUsername(event: Event) {
    this.#nameValue = (event.target as HTMLTextAreaElement).value;

    if (this.#nameValue.length > 0) {
      this.#nameValid = true;
    } else {
      this.#nameValid = false;
    }
    this.validateSignIn();
  }
  validatePassword(event: Event) {
    this.#passValue = (event.target as HTMLTextAreaElement).value;

    if (this.#passValue.length > 0) {
      this.#passValid = true;
    } else  {
      this.#passValid = false;
    }
    this.validateSignIn();
  }
  validateSignIn() {
    if (this.user.id) this.#nameValid = true;
    let res: boolean = this.#nameValid && this.#passValid ? false : true;
    return res;
  }
  signInCTA() {
    if(this.validateSignIn())
    return;
    const valid = this.userService.signIn(this.#nameValue, this.#passValue);
    valid.pipe(take(1)).subscribe((val) => {
      this.passInClasses.invalid = !val;
    });
  }

  stopObs() {
    this.notifier$.next(null);
    this.notifier$.unsubscribe();
  }
}
