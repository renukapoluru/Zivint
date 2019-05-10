import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartItemsRoutingModule } from './cart-items-routing.module';
import { CartItemsComponent } from './cart-items.component';
import { CartModule } from 'src/app/components/cart/cart.module';

@NgModule({
  declarations: [CartItemsComponent],
  imports: [
    CommonModule,
    CartItemsRoutingModule,
    CartModule
  ],
  exports: [
    CartItemsComponent
  ]
})
export class CartItemsModule { }
