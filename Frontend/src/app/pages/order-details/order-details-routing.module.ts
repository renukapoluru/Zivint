import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderDetailsComponent } from './order-details.component';

const routes: Routes = [{
  path: '',
  component: OrderDetailsComponent,
}, {
  path: '**',
  redirectTo: '',
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderDetailsRoutingModule { }
