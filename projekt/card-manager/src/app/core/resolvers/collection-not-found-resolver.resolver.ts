import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { CollectionsService } from '../../features/collections/services/collections.service';
import { Collection } from '../../features/models/collection.model';

export const collectionNotFoundResolverResolver: ResolveFn<Collection | null> = (route, _state) => {
  const service = inject(CollectionsService);
  const router = inject(Router);
  const id = route.paramMap.get('id');

  if (!id) {
    void router.navigate(['/404']);

    return EMPTY;
  }

  return service.getById(id).pipe(
    catchError(() => {
      void router.navigate(['/404']);

      return EMPTY;
    })
  );
};
