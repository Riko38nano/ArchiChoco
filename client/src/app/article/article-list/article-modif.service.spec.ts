import { TestBed } from '@angular/core/testing';

import { ArticleModifService } from './article-modif.service';

describe('ArticleModifService', () => {
  let service: ArticleModifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleModifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
