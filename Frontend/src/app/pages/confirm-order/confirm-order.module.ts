import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmOrderRoutingModule } from './confirm-order-routing.module';
import { ConfirmOrderComponent } from './confirm-order.component';

@NgModule({
  declarations: [ConfirmOrderComponent],
  imports: [
    CommonModule,
    ConfirmOrderRoutingModule
  ]
})
export class ConfirmOrderModule { }
