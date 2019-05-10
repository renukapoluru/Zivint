import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmOrderComponent } from './confirm-order.component';

const routes: Routes = [{
  path: '',
  component: ConfirmOrderComponent,
}, {
  path: '**',
  redirectTo: '',
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmOrderRoutingModule { }
