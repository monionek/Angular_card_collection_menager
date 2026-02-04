import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private readonly apiUrl = 'http://localhost:3000';
  // private readonly http = inject(HttpClient);

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

  public logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    this.changeIsLoggedIn(false);
  }

  public changeToken(token: string): void {
    localStorage.setItem("token", token);
  }

  public changeIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedInSubject.next(isLoggedIn);
  }
}
