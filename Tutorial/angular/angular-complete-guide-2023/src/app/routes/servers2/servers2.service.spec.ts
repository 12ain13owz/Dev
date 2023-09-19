import { TestBed } from '@angular/core/testing';

import { Servers2Service } from './servers2.service';

describe('Servers2Service', () => {
  let service: Servers2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Servers2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
