import { Route } from '@angular/router';
import { authGuard } from '@reddoc/core';
import { AUTH_ROUTES } from './features/auth/auth.routes';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => AUTH_ROUTES,
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  { path: '**', redirectTo: 'auth/login' },
];
