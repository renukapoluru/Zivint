import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';
import { PagesRoutingModule } from '../pages-routing.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';



@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    SlickCarouselModule
  ],
  exports: [
    ProductDetailsComponent
  ]
})
export class ProductDetailsModule { }
