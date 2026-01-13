import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap, BehaviorSubject } from 'rxjs';

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

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  public constructor() {
    this.token = localStorage.getItem('token');
    if (localStorage.getItem('token')) {
      this.changeIsLoggedIn(true);
    } else {
      this.changeIsLoggedIn(false);
    }
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
          this.changeIsLoggedIn(true);
        }),
        map(() => void 0)
      );
  }

  public logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    this.changeIsLoggedIn(false);
  }

  private changeIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedInSubject.next(isLoggedIn);
  }
}
