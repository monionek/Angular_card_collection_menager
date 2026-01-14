import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { collectionNotFoundResolverResolver } from './collection-not-found-resolver.resolver';

describe('collectionNotFoundResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => collectionNotFoundResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
