import { Routes } from '@angular/router';
import { BookdetailsComponent } from './pages/book/bookdetails/bookdetails.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
//     {
//     path: '**',
//     component: PageNotFoundComponent,
//   },
  {
    path: 'bookdetails',
    component: BookdetailsComponent,
    title: 'Bookdetails'
  }

];
