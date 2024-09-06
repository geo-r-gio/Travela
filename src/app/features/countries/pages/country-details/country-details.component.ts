import { Component, OnInit } from '@angular/core';
import { faPlaneDeparture, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { CountryService } from '@features/countries/services/country/country.service';
import { Country } from '@features/countries/models/country.model';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, Observable, of, tap } from 'rxjs';
import { ImageStorageService } from '@shared/services/images/image-storage.service';
import { FavoritesService } from '@features/countries/services/favorites/favorites.service';


@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss'
})
export class CountryDetailsComponent implements OnInit {

  faHeart = faHeart;
  faPlane = faPlaneDeparture;
  faInfo = faCircleInfo;

  country$!: Observable<Country>;
  borderCountries$!: Observable<Country[]>;

  countryLanguages: string[] = [];
  currencyName: string[] = [];
  currencySymbol: string[] = [];

  selectedCountry: string = '';
  images: string[] = [];

  breakpoints = {
    1250: {
      slidesPerView: 4
    },
    990: {
      slidesPerView: 3
    },
    835: {
      slidesPerView: 2
    },
    200: {
      slidesPerView: 1
    },
  }

  constructor(private countryService : CountryService, private route : ActivatedRoute, 
    private imageStorageService: ImageStorageService, private favoritesService : FavoritesService) {}

  ngOnInit(): void {
      this.route.params.subscribe(params => {
      const countryName = params['country'];
      this.selectedCountry = countryName;
      this.country$ = this.countryService.getCountryByName(countryName).pipe(
        tap((res) => console.log(res)),
        mergeMap(res => {
          this.borderCountries$ = this.countryService.getCountriesByCodes(res.borders || []);
          return of(res);
        })
      );

      // Subscribe to the observable to extract country languages
      this.country$.subscribe(country => {
        this.countryLanguages = country.languages ? Object.values(country.languages) : [];
      });

      // Subscribe to the observable to extract currency name and symbol
      this.country$.subscribe(country => {
        if (country.currencies) {
          this.currencyName = country.currencies ? Object.keys(country.currencies) : [];
          this.currencySymbol = country.currencies ? Object.values(country.currencies).map(currency => currency.symbol) : []
        }
      });

      this.onCountrySelect();
    });
  }

  async onCountrySelect(): Promise<void> {
    this.images = await this.imageStorageService.getImagesByCountry(this.selectedCountry);
  }

  addToFavorites(country: Country): void {
    if(this.favoritesService.isFavorite(country)) {
      this.favoritesService.removeFavorite(country);
    } else {
      this.favoritesService.addFavorite(country);
    }
  }

  isFavorite(country: Country): boolean {
    return this.favoritesService.isFavorite(country);
  }

}
