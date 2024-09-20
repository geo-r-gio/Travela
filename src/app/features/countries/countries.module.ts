import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    HomeComponent,
    CountryDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    FontAwesomeModule,
    CountriesRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CountriesModule { }
