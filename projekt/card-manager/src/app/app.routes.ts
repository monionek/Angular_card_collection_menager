import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { collectionNotFoundResolverResolver } from './core/resolvers/collection-not-found-resolver.resolver';

export const routes: Routes = [
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
    canActivate: [authGuard]
  },
  {
    path: 'collections/:id/edit',
    loadComponent: () =>
      import('./features/collections/pages/collection-form/collection-form.component')
        .then((m) => m.CollectionFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'collections/:id',
    loadComponent: () =>
      import('./features/collections/pages/collection-detail/collection-detail.component')
        .then((m) => m.CollectionDetailComponent),
    resolve: {
    collection: collectionNotFoundResolverResolver
  }
  },
  {
    path: '',
    loadComponent: () => import('./core/pages/main-page/main-page.component')
      .then((m) => m.MainPageComponent)
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/pages/page-not-found/page-not-found.component')
        .then((m) => m.PageNotFoundComponent),
  },
];
