import { Injectable } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  private apiUrl: string = 'http://localhost:3000/ToDO'

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  };

  public getOneById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  };

  public  update(id: number, todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/${id}`, todo);
  };

  public post(todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(this.apiUrl, todo);
  };

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  };
}
