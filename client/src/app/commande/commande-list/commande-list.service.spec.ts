import { TestBed } from '@angular/core/testing';

import { CommandeListService } from './commande-list.service';

describe('CommandeListService', () => {
  let service: CommandeListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandeListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
