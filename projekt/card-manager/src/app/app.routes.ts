import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        // loadComponent(() => import('components/LoginComponent'))
    },
    {
        path: 'collections',
        // loadComponent(() => improt('components/CollectionListComponent'))
    },
    {
        path: 'collections/:id',
        // loadComponent(() => import('components/CollectionDetailsComponent'))
    },
    {
        path: 'collections/:id/edit',
        // loadComponent(() => import('component/CardFormComponent'))
        //guarded
    },
    {
        path: 'card/:id/edit',
        // loadComponent(() => import('component/CardFormComponent'))
    },
    {
        path: "**",
        // loadComponent(() => import('./core/pages/page-not-found'))
    }
];
