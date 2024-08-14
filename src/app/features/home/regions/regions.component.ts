import { Component } from '@angular/core';
import { AuthService } from '../../../core/authentication/services/auth.service';
import { SnackbarService } from '../../../shared/services/snackbar/snackbar.service';
import { tap } from 'rxjs';
import { CountryService } from '../../services/country/country.service';
import { faMagnifyingGlass, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { capitalCity, Country, countryName, subRegion } from '../../../shared/models/country.model';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrl: './regions.component.scss'
})
export class RegionsComponent {

  errorMessage: string | null = null;
  countriesName: countryName[] = [];
  countries: Country[] =[];
  profile: any[] = [];

  activeDropdown: 'subregion' | 'city' | null = null;

  subregions: subRegion[] = [];
  selectedSubregion: string | null = null;
  isDropdownOpen = false;

  cities: capitalCity[] = [];
  selectedCity: string | null = null;
  
  faSearch = faMagnifyingGlass;
  faLocation = faLocationDot;

  constructor(private authService : AuthService, private snackbarService : SnackbarService, private countryService : CountryService){
    this.getProfile();

    this.authService.$refreshTokenReceived.subscribe((res) => {
      //put all API calls here so that we dont have to refresh the page to get them to work
      this.getProfile();
    })
  }

  ngOnInit(){
    this.getCountries();
    this.snackbarService.snackbarState
    .pipe(
      tap(message => {
        console.log('Snackbar message received:', message);
      })
    )
    .subscribe(message => {
      this.errorMessage = message;
      this.hideSnackbar(); 
    });
  }

  toggleDropdown(dropdown: 'subregion' | 'city') {
    this.activeDropdown = this.activeDropdown === dropdown ? null : dropdown;
    console.log(this.activeDropdown);
  }

  isDropdown(dropdown: 'subregion' | 'city'): boolean {
    console.log(this.activeDropdown === dropdown);
    return this.activeDropdown === dropdown;
  }

  selectSubregion(subregion: subRegion) {
    this.selectedSubregion = subregion.subregion;
    this.isDropdownOpen = false; // Close dropdown after selection
  }

  selectCity(city: capitalCity) {
    this.selectedCity = city.capital[0];
    this.isDropdownOpen = false;
  }

  getCountries(){
    this.countryService.getAllCountries().subscribe((data: any) => {
      this.countriesName = data;
      this.subregions = data;
      this.cities = data;
    });
  }

  getProfile(){  
    this.authService.getProfile().subscribe((data: any) => {
      this.profile = data;  // Store the profile data
    });
  }

  logOut(){
    this.authService.onLogOut();
  }

  hideSnackbar(){
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }

}
