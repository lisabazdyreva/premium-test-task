import { Routes } from '@angular/router';
import { Route } from './utils/const';

export const routes: Routes = [
  {
    path: Route.Home,
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: Route.Empty,
    redirectTo: Route.Home,
    pathMatch: 'full',
  },
  {
    path: `${Route.Beer}/:id`,
    loadComponent: () =>
      import('./pages/beer/beer.page').then((m) => m.BeerPage),
  },
];
