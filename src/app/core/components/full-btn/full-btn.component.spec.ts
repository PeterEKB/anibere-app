import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullBtnComponent } from './full-btn.component';

describe('FullBtnComponent', () => {
  let component: FullBtnComponent;
  let fixture: ComponentFixture<FullBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
