import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl: string = "http://localhost:3000";
  private token: string = '';
  private readonly http = inject(HttpClient);

  public getAuthToken(): string {    
    return this.token;
  }

  public saveAuthToken(token: string): void {
    this.token = token;
    this.saveTokenToLocalStorage();
  }

  private saveTokenToLocalStorage(): void {
    localStorage.setItem('token', this.token);
  }

  public login(login: string, password: string): Observable<string> {
    const data = {
      "login": login,
      "password": password
    };

    return this.http.post<string>(`${this.apiUrl}/login`, data);
  }
}
