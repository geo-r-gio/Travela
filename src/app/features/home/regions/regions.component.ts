import { Component } from '@angular/core';
import { AuthService } from '../../../core/authentication/services/auth.service';
import { SnackbarService } from '../../../shared/services/snackbar/snackbar.service';
import { tap } from 'rxjs';
import { CountryService } from '../../services/country/country.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrl: './regions.component.scss'
})
export class RegionsComponent {

  errorMessage: string | null = null;
  countries: any[] = [];
  profile: any[] = [];

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

  getCountries(){
    this.countryService.getAllCountries().subscribe((data: any) => {
      this.countries = data;
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
