import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUserID = null;
  currentUser = null;
  activeTab = 'tab-1';
  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.getUserDetails();
  }

  async getUserDetails() {
    this.currentUserID = await this.accountService.getUser();
    this.accountService.profile(this.currentUserID).subscribe(
      (response) => {
          if (response.error) {
              console.log('Error in fetching Profile.');
          } else {
              this.currentUser = response.user[0];
              console.log(this.currentUser);

          }
      },
      (error) => {
          console.log('Error in fetching Account Details.');
      }
    );
  }

  tabChange(tabName) {
    this.activeTab = tabName;
  }
}
