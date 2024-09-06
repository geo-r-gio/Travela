import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ClickOutsideDirective } from './directives/click-outside.directive';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CoreModule { }
