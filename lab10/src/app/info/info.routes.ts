import { Routes } from '@angular/router';

export const INFO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./info/info')
        .then(m => m.Info)
  }
];
