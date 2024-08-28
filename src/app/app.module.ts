import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { RegionsComponent } from './features/home/regions/regions.component';
import { CountriesComponent } from './shared/components/countries/countries.component';
import { GalleryComponent } from './shared/components/gallery/gallery.component';
import { CountryDetailsComponent } from './features/country-details/country-details.component';
import { ProfileComponent } from './features/profile/profile.component';
import { EditProfileComponent } from './features/profile/edit-profile/edit-profile.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegionsComponent,
    CountriesComponent,
    GalleryComponent,
    CountryDetailsComponent,
    ProfileComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule    
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
