import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CollectionsService } from '../../services/collections.service';
import { BehaviorSubject, combineLatest, Observable, map } from 'rxjs';
import { Collection, Color, SortMode } from '../../../models/collection.model';
import { AsyncPipe, LowerCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-collections-list',
  imports: [AsyncPipe, RouterLink, LowerCasePipe],
  templateUrl: './collections-list.component.html',
  styleUrl: './collections-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionsListComponent {
  private readonly collectionsService = inject(CollectionsService);
  public readonly colors: readonly Color[] = ['WHITE', 'BLUE', 'BLACK', 'RED', 'GREEN', 'COLORLESS'];
  private readonly sortModeSubject: BehaviorSubject<SortMode> = new BehaviorSubject<SortMode>('nameAsc');
  public readonly nameFilterSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
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

  public readonly viewCollections$: Observable<readonly Collection[]> = combineLatest([this.collections$, this.sortMode$, this.colorsFilter$, this.nameFilter$])
  .pipe(
    map(([collections, sortMode, colors, nameFilter]) => {

  let result: Collection[] = this.nameFilterCollection([...collections], nameFilter);
  result = this.colorFilterCollection(result, colors);

  switch (sortMode) {
    case 'nameAsc':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'nameDesc':
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'dateAsc':
      result.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
      break;
    case 'dateDesc':
      result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      break;
    case 'mostCards':
      result.sort((a, b) => b.cards.length - a.cards.length );
      break;
    case 'leastCards':
      result.sort((a, b) => a.cards.length - b.cards.length );
      break;
  }

  return result;
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
  private nameFilterCollection(collectionsCopy: Collection[], name: string): Collection[]  {
    if (name.trim().length === 0) {
      return collectionsCopy;
    }
    const lower = name.toLowerCase();

    return collectionsCopy.filter((c) =>
      c.name.toLowerCase().includes(lower)
    );
  }

  private colorFilterCollection(collectionsCopy: Collection[], colorsFilter: ReadonlySet<Color>): Collection[] {
  if (colorsFilter.size > 0) {
    return collectionsCopy.filter(
      (c) =>
        c.colors.length === colorsFilter.size &&
        c.colors.every((color) => colorsFilter.has(color))
    );
  }

  return collectionsCopy;

  }
}

