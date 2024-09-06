import { Component, Input } from '@angular/core';
import { Country } from '@features/countries/models/country.model';
import { AppRoutes } from '@shared/constants/app-routes.constants';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss',
})
export class CountriesComponent {
  @Input() country!: Country;

  appRoutes = AppRoutes;
}
