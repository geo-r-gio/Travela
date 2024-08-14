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
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/authentication/interceptors/token.interceptor';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegionsComponent,
    // CountriesComponent,
    GalleryComponent,
    CountryDetailsComponent,
    ProfileComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
    MatSelectModule
  ],
  providers: [provideHttpClient(withInterceptors([tokenInterceptor])), provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
