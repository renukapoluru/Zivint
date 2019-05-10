import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { AuthGuardService as AuthGuard } from '../services/auth-guard/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }, {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  }, {
    path: 'address',
    loadChildren: './address/address.module#AddressModule',
    canActivate: [AuthGuard]
  }, {
    path: 'confirm',
    loadChildren: './confirm-order/confirm-order.module#ConfirmOrderModule',
    canActivate: [AuthGuard]
  }, {
    path: 'login',
    loadChildren: './login-register/login-register.module#LoginRegisterModule'
  }, {
    path: 'register',
    loadChildren: './login-register/login-register.module#LoginRegisterModule'
  }, {
    path: 'orders',
    loadChildren: './orders/orders.module#OrdersModule',
    canActivate: [AuthGuard]
  }, {
    path: 'order/:id',
    loadChildren: './order-details/order-details.module#OrderDetailsModule',
    canActivate: [AuthGuard]
  },  {
    path: 'cart',
    loadChildren: './cart-items/cart-items.module#CartItemsModule'
  }, {
    path: 'product/:id',
    loadChildren: './product-details/product-details.module#ProductDetailsModule',
  },  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule',
    canActivate: [AuthGuard]
  },  {
    path: 'edit-profile',
    loadChildren: './edit-profile/edit-profile.module#EditProfileModule',
    canActivate: [AuthGuard]
  },  {
    path: '**',
    redirectTo: 'home'
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
