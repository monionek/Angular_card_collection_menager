import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CollectionsService } from '../../services/collections.service';
import { Observable } from 'rxjs';
import { Collection } from '../../../models/collection.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-collections-list',
  imports: [AsyncPipe],
  templateUrl: './collections-list.component.html',
  styleUrl: './collections-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionsListComponent {
  private readonly collectionsService = inject(CollectionsService);

  public readonly collections$: Observable<readonly Collection[]> = this.collectionsService.getAll();

}
