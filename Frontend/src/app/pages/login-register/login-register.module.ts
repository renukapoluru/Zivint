import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRegisterComponent } from './login-register.component';

import { LoginRegisterRoutingModule } from './login-register-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from '../pages-routing.module';

@NgModule({
  declarations: [LoginRegisterComponent],
  imports: [
    CommonModule,
    LoginRegisterRoutingModule,
    ReactiveFormsModule,
  ]
})
export class LoginRegisterModule { }
