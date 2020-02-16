import { TestBed } from '@angular/core/testing';

import { MobileSearchService } from './mobile-search.service';

describe('MobileSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MobileSearchService = TestBed.get(MobileSearchService);
    expect(service).toBeTruthy();
  });
});
