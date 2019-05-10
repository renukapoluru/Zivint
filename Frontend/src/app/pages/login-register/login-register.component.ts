import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  userLoggedIn = false;
  loginForm: FormGroup;
  registerForm: FormGroup;
  pageURL = null;
  cities = ['Bangalore'];
  states = ['Andhra Pradesh', 'Karnataka'];
  account = null;
  emailAvailable = true;
  userNotFound = false;
  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit() {
    this.pageURL = this.router.url;
    this.createForms();
  }

  createForms() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)] ),
    });
    this.registerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)] ),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10)]),
      pincode:  new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(8)])
    });

    this.registerForm.controls.email.valueChanges.pipe(debounceTime(500),
        distinctUntilChanged()
    ).subscribe(value => {
        if (value !== '') {
            this.checkEmailAvailability(value);
        }
    });

  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  get registerFormControls() {
    return this.registerForm.controls;
  }

  login() {
    this.accountService.login(this.loginForm.value).subscribe(
      (response) => {
          if (response.error) {
              console.log('Error in fetching Account Details.');
          } else {
              console.log(`Login response from server is`);
              console.log(response);
              response.loggedIn === true ? this.router.navigate(['/']) : this.userNotFound = true;
              localStorage.setItem('currentUserID', response.id);
          }
      },
      (error) => {
          console.log('Error in fetching Account Details.');
      }
    );
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(
      (response) => {
          if (response.error) {
              console.log('Error in fetching Account Details.');
          } else {
              this.account = response.account;
          }
      },
      (error) => {
          console.log('Error in fetching Account Details.');
      }
    );
  }

  checkEmailAvailability(email) {
    this.accountService.checkEmail(email).subscribe(
        (response) => {
            if (response.error) {
                console.log('Error in Email Availability.');
                this.emailAvailable = false;
            } else {
                this.emailAvailable = response.emailAvailable;
            }
        },
        (error) => {
            this.emailAvailable = false;
            console.log('Error in Email Availability.');
        }
    );
  }


}
