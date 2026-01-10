import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  
  public getAuthToken(): null | string {    
    return this.token;
  }
}
