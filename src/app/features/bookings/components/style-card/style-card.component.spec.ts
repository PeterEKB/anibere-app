import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleCardComponent } from './style-card.component';

describe('StyleCardComponent', () => {
  let component: StyleCardComponent;
  let fixture: ComponentFixture<StyleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StyleCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StyleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
