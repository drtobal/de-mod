import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./../app/app/home/components/index/index.component').then(c => c.IndexComponent),
    },
    {
        path: '**',
        redirectTo: '',
    }
];
