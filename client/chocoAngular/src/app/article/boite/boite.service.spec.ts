import { TestBed } from '@angular/core/testing';

import { BoiteService } from './boite.service';

describe('BoiteService', () => {
  let service: BoiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
