import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@core/authentication/guards/auth.guard';
import { loginGuard } from '@core/authentication/guards/login.guard';
import { NotFoundComponent } from '@features/invalid/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [loginGuard],
    loadChildren: () => import('./core/authentication/component/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'countries',
    canActivate: [authGuard],
    loadChildren: () => import('./features/countries/countries.module').then((m) => m.CountriesModule),
  },
  {
    path: 'user',
    canActivate: [authGuard],
    loadChildren: () => import('./features/user/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
