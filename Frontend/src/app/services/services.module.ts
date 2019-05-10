import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from './account/account.service';
import { OrderService } from './order/order.service';
import { ProductService } from './product/product.service';
import { AuthGuardService } from './auth-guard/auth-guard.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AccountService,
    OrderService,
    ProductService,
    AuthGuardService
  ]
})
export class ServicesModule { }
