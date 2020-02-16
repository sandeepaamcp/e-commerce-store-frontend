import { TestBed } from '@angular/core/testing';

import { FavMobilesService } from './fav-mobiles.service';

describe('FavMobilesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavMobilesService = TestBed.get(FavMobilesService);
    expect(service).toBeTruthy();
  });
});
