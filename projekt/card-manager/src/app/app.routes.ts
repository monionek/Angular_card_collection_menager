import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component')
        .then((m) => m.LoginComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/pages/page-not-found/page-not-found.component')
        .then((m) => m.PageNotFoundComponent),
  },
];
