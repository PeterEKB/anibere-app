import { TestBed } from '@angular/core/testing';

import { BookingCategoriesService } from './booking-categories.service';

describe('BookingService', () => {
  let service: BookingCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
