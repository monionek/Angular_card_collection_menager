import { Injectable } from '@angular/core';
import { Collection } from '../../models/collection.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  private readonly db: readonly Collection[] = [{id: "3", name: "konik", createdAt: "2026-01-10T10:00:00Z"}, {id: "1", name: "bonik", createdAt: "2026-01-10T10:00:00Z"}];

  public getAll(): Observable<readonly Collection[]> {
    return of(this.db);
  }
}
