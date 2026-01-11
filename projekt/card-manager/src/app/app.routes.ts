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
    path: 'collections',
    loadComponent: () =>
      import('./features/collections/pages/collections-list/collections-list.component')
        .then((m) => m.CollectionsListComponent),
  },
  {
    path: 'collections/new',
    loadComponent: () =>
      import('./features/collections/pages/collection-form/collection-form.component')
        .then((m) => m.CollectionFormComponent),
  },
  {
    path: 'collections/:id/edit',
    loadComponent: () =>
      import('./features/collections/pages/collection-form/collection-form.component')
        .then((m) => m.CollectionFormComponent),
  },
  {
    path: 'collections/:id',
    loadComponent: () =>
      import('./features/collections/pages/collection-detail/collection-detail.component')
        .then((m) => m.CollectionDetailComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/pages/page-not-found/page-not-found.component')
        .then((m) => m.PageNotFoundComponent),
  },
];
