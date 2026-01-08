import { Routes } from '@angular/router';

export const routes: Routes = [
      {
    path: '',
    loadComponent: () =>
      import('./pages/main-component/main-component')
        .then(m => m.MainComponent)
  },
  {
    path: 'book',
    loadChildren: () =>
        import('./book/book.routes')
            .then(m => m.BOOK_ROUTES)
  },
  {
    path: 'info',
    loadChildren: () =>
      import('./info/info.routes')
        .then(m => m.INFO_ROUTES)
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/page-not-found/page-not-found')
        .then(m => m.PageNotFound)
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
