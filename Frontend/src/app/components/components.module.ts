import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { OrdersModule } from '../pages/orders/orders.module';
import { CartModule } from './cart/cart.module';
import { SearchModule } from './search/search.module';
import { AddressesModule } from './addresses/addresses.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    OrdersModule,
    CartModule,
    SearchModule,
    AddressesModule
  ],
  exports: [
    HeaderModule,
    FooterModule,
    OrdersModule,
    CartModule,
    SearchModule,
    AddressesModule
  ]
})
export class ComponentsModule { }
