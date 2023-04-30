import { TestBed } from '@angular/core/testing';

import { BookingStyleService } from './booking-style.service';

describe('BookingStyleService', () => {
  let service: BookingStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
