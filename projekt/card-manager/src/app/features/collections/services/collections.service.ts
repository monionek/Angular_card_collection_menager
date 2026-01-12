import { inject, Injectable } from '@angular/core';
import { Collection, Color } from '../../models/collection.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  private readonly apiUrl = 'http://localhost:3000/collections';
  private readonly http = inject(HttpClient);

  public getAll(): Observable<readonly Collection[]> {
    return this.http.get<Collection[]>(this.apiUrl);
  }

  public getById(id: string): Observable<Collection> {
    return this.http.get<Collection>(`${this.apiUrl}/${id}`);
  }

  public create(name: string, colors: Color[]): Observable<Collection> {
    const newCollection: Collection = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
      colors,
    };

    return this.http.post<Collection>(this.apiUrl, newCollection);
  }

  public update(id: string, collection: Collection): Observable<Collection> {
    return this.http.put<Collection>(`${this.apiUrl}/${id}`, collection);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
