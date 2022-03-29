import { TestBed } from '@angular/core/testing';

import { OpMatrixService } from './op-matrix.service';

describe('OpMatrixService', () => {
  let service: OpMatrixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpMatrixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
