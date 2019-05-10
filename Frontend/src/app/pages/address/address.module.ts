import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressRoutingModule } from './address-routing.module';
import { AddressComponent } from '../address/address.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CartModule } from 'src/app/components/cart/cart.module';

@NgModule({
  declarations: [AddressComponent],
  imports: [
    CommonModule,
    AddressRoutingModule,
    ReactiveFormsModule,
    CartModule
  ]
})
export class AddressModule { }
