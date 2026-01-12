import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CollectionsService } from '../../services/collections.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, switchMap, of, map } from 'rxjs';
import { Collection } from '../../../models/collection.model';
import { AsyncPipe } from '@angular/common';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-collection-detail',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './collection-detail.component.html',
  styleUrl: './collection-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDetailComponent {
  private readonly notificationService: NotificationService = inject(NotificationService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly collectionsService: CollectionsService = inject(CollectionsService);
  private readonly router: Router = inject(Router);
  private collectionId: string | null = null;
  public readonly collection$: Observable<Collection | null> =
    this.route.paramMap.pipe(
      map((paramMap) => {
        const id = paramMap.get('id');
        this.collectionId = id;
        
        return id;
        }),
      switchMap((id: string | null) => {
        if (id === null) {
          void this.router.navigate(['/not-found']);

          return of<Collection | null>(null);
        }
        
        return this.collectionsService.getById(id);
      })
  );

  public delete(): void {
    if (!this.collectionId) {
      return;
    }
  
    const confirmed = confirm('Are you sure you want to delete this collection?');
    if (!confirmed) {
      return;
    }
  
    this.collectionsService.delete(this.collectionId).subscribe({
      next: () => {
        this.notificationService.success('Collection deleted');
        void this.router.navigate(['/collections']);
      },
      error: () => {
        this.notificationService.error('Failed to delete this Collection');
      },
    });
  }
}