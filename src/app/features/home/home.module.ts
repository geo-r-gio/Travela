import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { RegionsComponent } from './regions/regions.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
