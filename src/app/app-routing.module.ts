import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@core/authentication/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./core/authentication/component/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'countries',
    canActivate: [authGuard],
    loadChildren: () => import('./features/countries/countries.module').then((m) => m.CountriesModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
