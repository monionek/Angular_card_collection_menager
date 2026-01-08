import { Routes } from '@angular/router';

export const BOOK_ROUTES: Routes = [
  {
    path: 'list',
    loadComponent: () =>
      import('./book-list/book-list')
        .then(m => m.BookList)
  },
  {
    path: 'form',
    loadComponent: () =>
      import('./book-form/book-form')
        .then(m => m.BookForm)
  },
  {
    path: ':id/form',
    loadComponent: () =>
      import('./book-form/book-form')
        .then(m => m.BookForm)
  },
  {
    path: ':id/details',
    loadComponent: () =>
      import('./book-details/book-details')
        .then(m => m.BookDetails)
  }
];
