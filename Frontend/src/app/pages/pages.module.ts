import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';

import { HomeModule } from './home/home.module';
import { ConfirmOrderModule } from './confirm-order/confirm-order.module';
import { LoginRegisterModule } from './login-register/login-register.module';
import { ComponentsModule } from '../components/components.module';
import { ProductDetailsModule } from './product-details/product-details.module';
import { EditProfileModule } from './edit-profile/edit-profile.module';
import { ProfileModule } from './profile/profile.module';
import { OrderDetailsModule } from './order-details/order-details.module';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HomeModule,
    ConfirmOrderModule,
    LoginRegisterModule,
    ProductDetailsModule,
    ProfileModule,
    EditProfileModule,
    OrderDetailsModule,
    ComponentsModule,
  ],
})
export class PagesModule { }
