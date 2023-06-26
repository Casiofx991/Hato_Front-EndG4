import { TestBed } from '@angular/core/testing';

import { ServingService } from './serving.service';

describe('ServingService', () => {
  let service: ServingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
