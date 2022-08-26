import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { AccountService } from '../_services/account.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.accountService.userValue;
    console.log('Gard user : ', user);

    if (user.email && user.displayName) {
      // authorised so return true
      console.log('Gard return true : ');

      return true;
    } else {
      console.log('Gard return false : ');

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/account/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
  }
}
