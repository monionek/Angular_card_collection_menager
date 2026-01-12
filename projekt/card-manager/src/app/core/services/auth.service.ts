import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

interface LoginResponse {
  readonly token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000';
  private readonly http = inject(HttpClient);

  private token: string | null = null;

  public constructor() {
    this.token = localStorage.getItem('token');
  }
  public getAuthToken(): string | null {
    return this.token;
  }

  public hasToken(): boolean {
    return this.token !== null;
  }

  public login(login: string, password: string): Observable<void> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { login, password })
      .pipe(
        tap((response) => {
          this.token = response.token;
          localStorage.setItem('token', response.token);
        }),
        map(() => void 0)
      );
  }

  public logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }
}
