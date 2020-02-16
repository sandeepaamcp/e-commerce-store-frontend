import { TestBed } from '@angular/core/testing';

import { CarerService } from './carer.service';

describe('CarerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarerService = TestBed.get(CarerService);
    expect(service).toBeTruthy();
  });
});
