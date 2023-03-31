import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePuckComponent } from './profile-puck.component';

describe('ProfilePuckComponent', () => {
  let component: ProfilePuckComponent;
  let fixture: ComponentFixture<ProfilePuckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePuckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePuckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
