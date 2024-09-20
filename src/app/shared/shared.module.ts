import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { CountriesComponent } from './components/countries/countries.component';
import { RouterModule } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';


@NgModule({
  declarations: [
    SnackbarComponent,
    CountriesComponent,
    GalleryComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SnackbarComponent,
    CountriesComponent,
    GalleryComponent
  ],
})
export class SharedModule { }
