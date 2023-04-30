import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullBtnComponent } from './components/full-btn/full-btn.component';
import { ArrayFromNumberPipe } from './pipes/array-from-number.pipe';

@NgModule({
  declarations: [FullBtnComponent, ArrayFromNumberPipe],
  imports: [CommonModule],
  exports: [FullBtnComponent,  ArrayFromNumberPipe],
})
export class SharedModule {}
