import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvalidRoutingModule } from './invalid-routing.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    InvalidRoutingModule
  ]
})
export class InvalidModule { }
