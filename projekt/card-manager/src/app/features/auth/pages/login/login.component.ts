import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginFormModel } from '../../../models/loginForm.model';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authService: AuthService = inject(AuthService);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);

  public readonly loginForm = this.formBuilder.group<LoginFormModel>({
    login: this.formBuilder.control('', { validators: [Validators.required]}),
    password: this.formBuilder.control('', { validators: [Validators.required]})
  });

  private handleLoginError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    
    return EMPTY;
  }

  public submitLogin(): void {
    if ( this.loginForm.invalid) return;

    const {login, password} = this.loginForm.getRawValue();

    this.authService.login(login, password).pipe(
      tap((value: string) => { 
        this.authService.saveAuthToken(value);
        void this.router.navigate(['/collections']);
      }),
      catchError((error: HttpErrorResponse) => {
        return this.handleLoginError(error);
      })
    ).subscribe();
  }
}
