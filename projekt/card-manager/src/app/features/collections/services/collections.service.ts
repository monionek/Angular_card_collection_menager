import { Injectable } from '@angular/core';
import { Collection } from '../../models/collection.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {

  private readonly db: readonly Collection[] = [
  {
    id: '1',
    name: 'Mono White Aggro',
    createdAt: '2026-01-10T10:00:00Z',
    colors: ['WHITE'],
  },
  {
    id: '2',
    name: 'Simic Ramp',
    createdAt: '2026-01-08T12:00:00Z',
    colors: ['BLUE', 'GREEN'],
  },
  {
    id: '3',
    name: 'Rakdos Sacrifice',
    createdAt: '2026-01-05T09:30:00Z',
    colors: ['BLACK', 'RED'],
  },
  {
    id: '4',
    name: 'Jeskai Control',
    createdAt: '2026-01-01T18:45:00Z',
    colors: ['WHITE', 'BLUE', 'RED'],
  },
  {
    id: '5',
    name: 'Golgari Midrange',
    createdAt: '2025-12-28T14:15:00Z',
    colors: ['BLACK', 'GREEN'],
  },
  {
    id: '6',
    name: 'Five Color Goodstuff',
    createdAt: '2025-12-20T20:00:00Z',
    colors: ['WHITE', 'BLUE', 'BLACK', 'RED', 'GREEN'],
  },
  {
    id: '7',
    name: 'Colorless Eldrazi',
    createdAt: '2025-12-10T08:00:00Z',
    colors: ['COLORLESS'],
  },
  {
    id: '8',
    name: 'Mono Red Burn',
    createdAt: '2026-01-11T07:30:00Z',
    colors: ['RED'],
  },
];

  public getAll(): Observable<readonly Collection[]> {
    return of(this.db);
  }

  public getById(id: string): Observable<Collection | null> {
    const collection = this.db.find((c: Collection) => c.id === id) ?? null;
    
    return of(collection);
  }
}
