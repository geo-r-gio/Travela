import { Component, ElementRef, ViewChild } from '@angular/core';
import { SnackbarService } from '@shared/services/snackbar/snackbar.service';
import { CountryService } from '@features/countries/services/country/country.service';
import { faMagnifyingGlass, faLocationDot, faCloudArrowUp, faMapLocationDot, faMapPin, faMoneyBill, faEarthAsia } from '@fortawesome/free-solid-svg-icons';
import { Country } from '@features/countries/models/country.model';
import { ImageStorageService } from '@shared/services/images/image-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  faSearch = faMagnifyingGlass;
  faLocation = faLocationDot;
  faFileUpload = faCloudArrowUp;
  faRegion = faMapLocationDot;
  faPin = faMapPin;
  faMoney = faMoneyBill;
  faLanguage = faEarthAsia;

  errorMessage: string | null = null;
  profile: any[] = [];

  countries: Country[] = [];
  subregions: string[] = [];
  capitals: string[] = [];
  currencies: string[] = [];
  languages: string[] = [];
  regions: string[] = [];

  selectedSubregion: string = '';
  selectedCapital: string = '';
  selectedCurrency: string = '';
  selectedLanguage: string = '';
  selectedRegion: string = '';

  filteredCountries: Country[] = [];
  searchQuery: string = '';

  isScreen1: boolean = false;
  isScreen2: boolean = false;

  selectedCountry: string = 'South Georgia'; //Default value
  images: string[] = [];
  @ViewChild('fileInput') fileInput!: ElementRef;
  imageURL: string | null = null;

  isFilterBoxVisible: boolean = false;

  breakpoints = {
    1250: {
      slidesPerView: 4,
      grid: {
        rows: 2,
        fill: "row"
      }
    },
    990: {
      slidesPerView: 3,
      grid: {
        rows: 2,
        fill: "row"
      }
    },
    835: {
      slidesPerView: 2,
      grid: {
        rows: 2,     
        fill: "row"
      }
    },
    200: {
      slidesPerView: 1,
      grid: {
        rows: 1,      
        fill: "row"
      }
    },
  }

  breakpoints2 = {
    1300: {
      slidesPerView: 8,
    },
    1000: {
      slidesPerView: 5,
    },
    850: {
      slidesPerView: 4,
    },
    600: {
      slidesPerView: 3,
    },
    540: {
      slidesPerView: 2,
    },
    250: {
      slidesPerView: 1,
    }
  }

  constructor(private snackbarService : SnackbarService, private countryService : CountryService, 
    private imageStorageService: ImageStorageService) {}

  ngOnInit(): void {
    this.fetchCountries();
    this.checkScreenSize1();
    window.addEventListener('resize', () => this.checkScreenSize1());
    this.checkScreenSize2();
    window.addEventListener('resize', () => this.checkScreenSize2());
    this.onCountrySelect(this.selectedCountry);
    this.snackbarService.snackbarState
    .subscribe(message => {
      this.errorMessage = message;
      this.hideSnackbar(); 
    });
  }

  fetchCountries(): void {
    this.countryService.getAllCountries().subscribe((data: Country[]) => {
      this.countries = data;
      this.filteredCountries = data;

      // Extract unique subregions, capitals, currencies, and languages
      this.subregions = Array.from(new Set(data.map(country => country.subregion).filter((subregion): subregion is string => Boolean(subregion))));
      this.capitals = Array.from(new Set(data.map(country => country.capital && country.capital[0]).filter((capital): capital is string => Boolean(capital))));
      this.currencies = Array.from(new Set(data.flatMap(country => country.currencies ? Object.keys(country.currencies) : []).filter(Boolean)));
      this.languages = Array.from(new Set(data.flatMap(country => country.languages ? Object.values(country.languages) : []).filter(Boolean)));

      this.regions = Array.from(new Set(data.map(country => country.region).filter((region): region is string => Boolean(region))));
    });
  }

  filterCountries(): Country[] {
    return this.countries.filter(country =>
      (!this.selectedSubregion || country.subregion === this.selectedSubregion) &&
      (!this.selectedCapital || (country.capital && country.capital[0] === this.selectedCapital)) &&
      (!this.selectedCurrency || (country.currencies && Object.keys(country.currencies).includes(this.selectedCurrency))) &&
      (!this.selectedLanguage || (country.languages && Object.values(country.languages).includes(this.selectedLanguage))) &&
      (!this.selectedRegion || country.region === this.selectedRegion) &&
      (!this.searchQuery || country.name.common.toLowerCase().includes(this.searchQuery.toLocaleLowerCase()))
    );
  }

  filterByRegion(region: string): void {
    this.selectedRegion = region;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredCountries = this.filterCountries();
  }

  checkScreenSize1(): void {
    this.isScreen1 = window.innerWidth <= 1370;
  }

  checkScreenSize2(): void {
    this.isScreen2 = window.innerWidth <= 990;
  }

  async onCountrySelect(country: string): Promise<void> {
    this.selectedCountry = country;
    this.images = await this.imageStorageService.getImagesByCountry(country);
  }

  isCountrySelected(country: string): boolean {
    return this.selectedCountry === country;
  }

  toggleFilterBox() {
    this.isFilterBoxVisible = !this.isFilterBoxVisible;
  }

  hideSnackbar(){
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }


}
