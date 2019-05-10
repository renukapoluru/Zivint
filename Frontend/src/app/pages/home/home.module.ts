import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { SortingModule } from './sorting/sorting.module';

import {NgxPaginationModule} from 'ngx-pagination';
import { HeroSliderComponent } from './hero-slider/hero-slider.component';
import { HeroSliderModule } from './hero-slider/hero-slider.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SidebarModule,
    SortingModule,
    NgxPaginationModule,
    HeroSliderModule
  ],
  exports: [
    SidebarModule,
    SortingModule
  ],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeModule { }
