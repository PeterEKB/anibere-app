import { ChangeDetectionStrategy } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-btn',
  templateUrl: './full-btn.component.html',
  styleUrls: ['./full-btn.component.scss'],
})
export class FullBtnComponent implements OnInit {
  #disable: boolean = false;
  #defBg: string = 'var(--light-blue)';
  #defBorderColor: string = 'var(--hot-blue)';
  #defTextColor: string = 'white';
  #styles: Styles = {
    background: this.#defBg,
    'border-color': this.#defBorderColor,
    color: this.#defTextColor,
  };

  @Input('deactivate')
  set disable(val: boolean | string) {
    if (val === '' || val === true || val === 'true') {
      this.#disable = true;
    } else {
      this.#disable = false;
    }
  }
  get disable() {
    return this.#disable;
  }
  @Input('colors')
  set styles(val: Color & Styles) {
    if (val.primary) this.#styles.background = val.primary;
    if (val.secondary) this.#styles['border-color'] = val.secondary;
    if (val.text) this.#styles.color = val.text;
  }
  get styles() {
    return this.#styles;
  }

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit() {}
}

export interface Color {
  primary?: string;
  secondary?: string;
  text?: string;
}
export interface Styles {
  background?: string;
  'border-color'?: string;
  color?: string;
}
