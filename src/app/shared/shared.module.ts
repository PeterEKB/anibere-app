import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullBtnComponent } from './components/full-btn/full-btn.component';

@NgModule({
  declarations: [FullBtnComponent],
  imports: [CommonModule],
  exports: [FullBtnComponent],
})
export class SharedModule {}
