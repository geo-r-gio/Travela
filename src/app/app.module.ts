import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/authentication/interceptors/token.interceptor';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { errorInterceptor } from '@core/authentication/interceptors/error.interceptor';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { ClickOutsideDirective } from '@core/directives/click-outside.directive';
import { NotFoundComponent } from './features/invalid/pages/not-found/not-found.component';

const dbConfig: DBConfig = {
  name: 'CountryImagesDB',
  version: 1,
  objectStoresMeta: [{
    store: 'images',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'country', keypath: 'country', options: { unique: false } },
      { name: 'imagePath', keypath: 'imagePath', options: { unique: false } }
    ]
  }]
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClickOutsideDirective,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
    FormsModule,
    LazyLoadImageModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [provideHttpClient(withInterceptors([tokenInterceptor, errorInterceptor])), provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
