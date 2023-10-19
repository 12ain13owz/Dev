import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { serverResolverResolver } from './server-resolver.resolver';

describe('serverResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => serverResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
