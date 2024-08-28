import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { roleGuard } from '@core/authentication/guards/role.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'country-details/:country',
    component: CountryDetailsComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'admin-profile',
    component: ProfileComponent,
    canActivate: [roleGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
