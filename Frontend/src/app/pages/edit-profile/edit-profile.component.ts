import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  currentUserID = null;
  currentUser = null;
  editForm: FormGroup;
  cities = ['Bangalore'];
  states = ['Andhra Pradesh', 'Karnataka'];
  activeTab = 'tab-1';
  formUpdateSuccess = null;
  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit() {
    this.getUserDetails();
  }

  createForm() {
    this.editForm = new FormGroup ({
      name: new FormControl(this.currentUser.name, Validators.required),
      password: new FormControl(this.currentUser.password, [Validators.required, Validators.minLength(8)] ),
      city: new FormControl(this.currentUser.city, Validators.required),
      state: new FormControl(this.currentUser.state, Validators.required),
      phone: new FormControl(this.currentUser.phone, [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10)]),
      pincode:  new FormControl(this.currentUser.pincode, [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(8)])
    });
  }

  get registerFormControls() {
    return this.editForm.controls;
  }

  async getUserDetails() {
    this.currentUserID = await this.accountService.getUser();
    console.log(this.currentUserID);
    if (!this.currentUserID.length) {
      this.router.navigate(['/pages/login']);
    } else {
      this.accountService.profile(this.currentUserID).subscribe(
        (response) => {
            if (response.error) {
                console.log('Error in fetching Profile.');
            } else {
                this.currentUser = response.user[0];
                this.createForm();
            }
        },
        (error) => {
            console.log('Error in fetching Account Details.');
        }
      );
    }
  }

  tabChange(tabName) {
    this.activeTab = tabName;
  }

  update() {
    this.accountService.editProfile(this.currentUserID, this.editForm.value).subscribe(
      (response) => {
          if (response.error) {
              console.log('Error in Updating Profile.');
          } else {
              this.formUpdateSuccess = true;
              setTimeout(() => {
                this.formUpdateSuccess = null;
              }, 3000);
          }
      },
      (error) => {
          console.log('Error in Updating Profile.');
      }
    );
  }

}
