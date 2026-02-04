import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap, map, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

interface LoginResponse {
  readonly token: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl = 'http://localhost:3000';
  private readonly http = inject(HttpClient);
  private readonly authService: AuthService = inject(AuthService);

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
    public login(login: string, password: string): Observable<void> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { login, password })
      .pipe(
        tap((response) => {
          this.authService.changeToken(response.token);
          this.authService.changeIsLoggedIn(true);
        }),
        map(() => void 0)
      );
  }
}
