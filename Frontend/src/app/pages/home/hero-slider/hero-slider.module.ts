import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroSliderComponent } from './hero-slider.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [HeroSliderComponent],
  imports: [
    CommonModule,
    SlickCarouselModule
  ],
  exports: [
    HeroSliderComponent
  ]
})
export class HeroSliderModule { }
