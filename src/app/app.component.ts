import { Component } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'newsportalapp';
  user: User = {};
  IsLoggedIn = false;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe((x) => (this.user = x));
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.checkLoggedInorNot();
  }

  checkLoggedInorNot() {
   this.IsLoggedIn = this.accountService.userValue.email ? true : false;
  }

  logout() {
    this.accountService.logout();
  }
}
