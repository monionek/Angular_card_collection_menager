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
    path: "collections",
    loadComponent: () => import('./features/collections/pages/collections-list/collections-list.component')
        .then((m) => m.CollectionsListComponent)
  },
    {
    path: '**',
    loadComponent: () =>
      import('./core/pages/page-not-found/page-not-found.component')
        .then((m) => m.PageNotFoundComponent),
  },
];
