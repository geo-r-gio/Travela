import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { UniquePipe } from './pipes/unique.pipe';
import { CountriesComponent } from './components/countries/countries.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SnackbarComponent,
    UniquePipe,
    CountriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SnackbarComponent,
    UniquePipe,
    CountriesComponent
  ],
})
export class SharedModule { }
