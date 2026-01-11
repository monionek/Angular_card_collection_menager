import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CollectionsService } from '../../services/collections.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, switchMap, of, map } from 'rxjs';
import { Collection } from '../../../models/collection.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-collection-detail',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './collection-detail.component.html',
  styleUrl: './collection-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDetailComponent {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly collectionsService: CollectionsService = inject(CollectionsService);
  private readonly router: Router = inject(Router);
  public readonly collection$: Observable<Collection | null> =
    this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      switchMap((id: string | null) => {
        if (id === null) {
          void this.router.navigate(['/not-found']);

          return of<Collection | null>(null);
        }

        return this.collectionsService.getById(id);
      })
  );
}