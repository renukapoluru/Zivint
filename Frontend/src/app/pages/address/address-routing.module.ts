import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressComponent } from './address.component';

const routes: Routes = [{
  path: '',
  component: AddressComponent,
}, {
  path: '**',
  redirectTo: '',
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }
