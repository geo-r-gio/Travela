import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '@core/authentication/services/auth.service';
import { CountryService } from '@features/countries/services/country/country.service';
import { UserProfile } from '@shared/models/user.model';
import { ImageStorageService } from '@shared/services/images/image-storage.service';
import { SnackbarService } from '@shared/services/snackbar/snackbar.service';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Country } from '@features/countries/models/country.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  errorMessage: string | null = null;
  profile: UserProfile | undefined;
  countries: Country[] = [];

  faFileUpload = faCloudArrowUp;

  @ViewChild('fileInput') fileInput!: ElementRef;
  imageURL: string | null = null;

  isAdmin: boolean = false;

  constructor(private authService : AuthService, private snackbarService : SnackbarService, 
    private imageStorageService : ImageStorageService, private countryService : CountryService){
    this.getProfile();
    this.fetchCountries();

    this.authService.$refreshTokenReceived.subscribe((res) => {
      this.getProfile();
    })
  }

  ngOnInit(){
    this.isAdmin = this.authService.isAdmin();

    this.snackbarService.snackbarState
    .subscribe(message => {
      this.errorMessage = message;
      this.hideSnackbar(); 
    });
  }

  getProfile(){  
    this.authService.getProfile().subscribe((data: UserProfile) => {
      this.profile = data;
    });
  }

  fetchCountries() {
    this.countryService.getAllCountries().subscribe((data: Country[]) => {
      this.countries = data;
    });
  }

  selectImage(): void {
    this.fileInput.nativeElement.click();
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const imagePath = reader.result as string;
        this.imageURL = imagePath;
        const fileName = file.name.toLowerCase();
        let countryMatched = false;

        // Assuming you are storing images by country in the service
        for (const country of this.countries) {
          if (fileName.includes(country.name.common.toLocaleLowerCase())) {
            await this.imageStorageService.storeImage(country.name.common, imagePath);
            countryMatched = true;
            break;
          }
        }

        if (!countryMatched) {
          console.warn('No matching country found for the uploaded image');
        }
      };
      reader.readAsDataURL(file);
    }
  }

  hideSnackbar(){
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }

}
