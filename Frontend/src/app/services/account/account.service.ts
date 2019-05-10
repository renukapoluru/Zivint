import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserSessionCheck } from 'src/app/interfaces/user-session-check';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  userLoggedIn = false;
  currentUserKey = 'currentUserID';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(private router: Router, private http: HttpClient) { }

  register(user): Observable<any> {
    return this.http.post(`${environment.ACCOUNT_API_URL}/register/`, {user});
  }

  checkEmail(email): Observable<any> {
    return this.http.post(`${environment.ACCOUNT_API_URL}/checkEmailAvailability/`, {email});
  }

  login(user): Observable<any> {
    return this.http.post(`${environment.ACCOUNT_API_URL}/login/`, {user});
  }

  currentUser(user) {
    this.setItem({
      key: this.currentUserKey,
      value:  user
    });
  }

  async getUser() {
    const currentUser = await localStorage.getItem('currentUserID');
    return currentUser;
  }

  setItem({ key, value }: { key: string, value: any}) {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  getItem(key: any): Promise<[]> {
    return new Promise((resolve, reject) => {
      try {
        const value = localStorage.getItem(key);
        (typeof value === 'string' || value === null) ? resolve(JSON.parse((value === null || value === '') ? '[]' : value)) : reject(false);
      } catch (error) {
        reject(error);
      }
    });
  }

  removeItem(key: any): Promise<[]> {
    return new Promise((resolve, reject) => {
      try {
        localStorage.removeItem(key);
        resolve([]);
      } catch (error) {
        reject(error);
      }
    });
  }

  profile(id): Observable<any> {
    return this.http.post(`${environment.ACCOUNT_API_URL}/profile/`, {id});
  }

  editProfile(id, user): Observable<any> {
    return this.http.post(`${environment.ACCOUNT_API_URL}/edit-profile/`, {id, user});
  }

  userSessionCheck(): Observable<boolean> {
    const currentUserID = localStorage.getItem('currentUserID');
    return new Observable(observer => {
      if (currentUserID !== null && currentUserID !== undefined) {
        this.http.post(`${environment.ACCOUNT_API_URL}/userSessionCheck`, JSON.stringify({ currentUserID }), this.httpOptions)
        .subscribe(
          (response: UserSessionCheck) => {
            if (response.error) {
              this.router.navigate(['/pages/login']);
              return false;
            }
            observer.next(true);
          }, (error) => {
            this.router.navigate(['/pages/login']);
            observer.next(false);
          });
      } else {
        this.router.navigate(['/pages/login']);
        observer.next(false);
      }
    });
  }

  logout(id): Observable<any> {
    return this.http.post(`${environment.ACCOUNT_API_URL}/logout/`, {id});
  }

}
