import { inject, Injectable } from '@angular/core';
import { Collection, Color } from '../../models/collection.model';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  private readonly apiUrl: string = "http://localhost:3000";
  private readonly http = inject(HttpClient);

  private db: readonly Collection[] = [
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

  public create(name: string, colors: Color[]): Observable<Collection> {
    const id: string = crypto.randomUUID();
    const createdAt: string = new Date().toISOString();

    const newCollection: Collection = {
      id: id,
      name: name,
      createdAt: createdAt,
      colors: colors
    };

    this.db = [...this.db, newCollection];

    return of(newCollection);
    // return this.http.post<Collection>(`${this.apiUrl}/collections`, newCollection);
  };

  public update(id: string, collection: Collection): Observable<Collection> {
    const index: number = this.db.findIndex(
      (c: Collection) => c.id === id
    );

    if (index === -1) {

      return throwError(() => new Error('Collection not found'));
    }

    const updatedCollection: Collection = {
      ...collection,
      id,
    };

    this.db = this.db.map((c: Collection) =>
      c.id === id ? updatedCollection : c
    );

    return of(updatedCollection);
  }
  public delete(id: string): Observable<boolean> {
    const exists: boolean = this.db.some(
      (c: Collection) => c.id === id
    );

    if (!exists) {
      
      return throwError(() => new Error('Collection not found'));
    }

    this.db = this.db.filter(
      (c: Collection) => c.id !== id
    );

    return of(true);
  }
}
