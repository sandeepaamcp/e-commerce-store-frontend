import { TestBed } from '@angular/core/testing';

import { UserBackendConnectionService } from './user-backend-connection.service';

describe('UserBackendConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserBackendConnectionService = TestBed.get(UserBackendConnectionService);
    expect(service).toBeTruthy();
  });
});
