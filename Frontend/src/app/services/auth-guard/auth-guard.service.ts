import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

/*Importing service starts*/
import { AccountService } from '../account/account.service';
/*Importing service ends*/

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
    public accountService: AccountService,
    public router: Router
    ) { }

    canActivate(): Observable<boolean> {
        return this.accountService.userSessionCheck();
    }

}
