import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CollectionsService } from '../../services/collections.service';
import { BehaviorSubject, combineLatest, Observable, map } from 'rxjs';
import { Collection, Color, SortMode } from '../../../models/collection.model';
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
  public readonly colors: readonly Color[] = ['WHITE', 'BLUE', 'BLACK', 'RED', 'GREEN', 'COLORLESS'];
  private readonly sortModeSubject: BehaviorSubject<SortMode> = new BehaviorSubject<SortMode>('nameAsc');
  private readonly nameFilterSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private readonly colorsFilterSubject: BehaviorSubject<ReadonlySet<Color>> = new BehaviorSubject<ReadonlySet<Color>>(new Set());
  public readonly colorLabels: Record<Color, string> = {
  WHITE: 'White',
  BLUE: 'Blue',
  BLACK: 'Black',
  RED: 'Red',
  GREEN: 'Green',
  COLORLESS: 'Colorless',
};
  public sortMode$: Observable<SortMode> = this.sortModeSubject.asObservable();
  public nameFilter$: Observable<string> = this.nameFilterSubject.asObservable();
  public colorsFilter$: Observable<ReadonlySet<Color>> = this.colorsFilterSubject.asObservable();
  public readonly collections$: Observable<readonly Collection[]> = this.collectionsService.getAll();

  public readonly viewCollections$: Observable<readonly Collection[]> = combineLatest([this.collections$, this.sortMode$, this.colorsFilter$]).pipe(map(([collections, sortMode, colors]) => {
    let collectionCopy = [...collections];
    if (colors.size > 0) {
      collectionCopy = collectionCopy.filter(
        (c: Collection) =>
          c.colors.length === colors.size &&
          c.colors.every((color: Color) => colors.has(color))
      );
    };
    switch (sortMode) {
      case 'nameAsc':
        collectionCopy.sort((a,b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        collectionCopy.sort((a,b) => b.name.localeCompare(a.name));
        break;
      case 'dateAsc':
        collectionCopy.sort((a,b) => a.createdAt.localeCompare(b.createdAt));
        break;
      case 'dateDesc':
        collectionCopy.sort((a,b) => b.createdAt.localeCompare(a.createdAt));
        break;
    }

    return collectionCopy;

  }));

  public changeSort(mode: SortMode): void {
    this.sortModeSubject.next(mode);
  }

  public toggleColor(color: Color): void {
    const next = new Set(this.colorsFilterSubject.value);
    if (next.has(color)) {
      next.delete(color);
    } else {
      next.add(color);
    }
    this.colorsFilterSubject.next(next);
  }

}

