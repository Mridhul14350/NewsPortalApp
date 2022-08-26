import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  user: User = {};
  usersArray: User[] = Array<User>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    this.form = this.formBuilder.group({
      displayName: ['', Validators.required],
      email: [
        '',
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  ngOnInit() {
    this.getUserData();
  }

  async getUserData() {
    var usersArray = <any>[];
    const loggedInUser = this.accountService.userValue;

    this.f['email'].disable();

    usersArray = localStorage.getItem('Users')
      ? localStorage.getItem('Users')
      : <{}>[];

    usersArray = JSON.parse(usersArray);
    await usersArray.find((user: any) => {
      if (user.email == loggedInUser.email) {
        // return user;
        this.f['displayName'].setValue(user.displayName);
        this.f['email'].setValue(user.email);
        this.f['password'].setValue(user.password);
      }
      return null;
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    var tmpUsers;
    let savedflag = false;

    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    tmpUsers = localStorage.getItem('Users');
    tmpUsers = tmpUsers && tmpUsers != null ? JSON.parse(tmpUsers) : [];

    this.usersArray = tmpUsers;

    this.user = this.form.value;

    this.usersArray.push(this.user);

    console.log('this.usersArray  : ', this.usersArray);

    for (let i = 0; i < this.usersArray.length; i++) {
      if (this.usersArray[i].email == this.accountService.userValue.email) {
        this.usersArray[i].displayName = this.f['displayName'].value;
        this.usersArray[i].password = this.f['password'].value;
        savedflag = true;
      }
    }

    if (savedflag) {
      localStorage.setItem('Users', JSON.stringify(this.usersArray));

      this.alertService.success('Profile Saved Successfully', {
        keepAfterRouteChange: true,
      });
    } else {
      this.alertService.error('Failed to save profile.', {
        keepAfterRouteChange: true,
      });
    }

    this.loading = false;
  }

  deleteAccount() {
    var tmpUsers;
    let deleteflag = false;

    // reset alerts on submit
    this.alertService.clear();

    this.loading = true;

    tmpUsers = localStorage.getItem('Users');
    tmpUsers = tmpUsers && tmpUsers != null ? JSON.parse(tmpUsers) : [];

    this.usersArray = tmpUsers;

    this.user = this.form.value;


    for (let i = 0; i < this.usersArray.length; i++) {
      if (this.usersArray[i].email == this.accountService.userValue.email) {
        this.usersArray.splice(i,1);
        deleteflag = true;
      }
    }
    console.log('this.usersArray delete  : ', this.usersArray);
    if (deleteflag) {
      localStorage.setItem('Users', JSON.stringify(this.usersArray));

      this.alertService.success('Account Deleted Successfully', {
        keepAfterRouteChange: true,
      });
      this.router.navigate(['../login'], { relativeTo: this.route });
    } else {
      this.alertService.error('Failed to Delete Account.', {
        keepAfterRouteChange: true,
      });
    }

    this.loading = false;
  }
}
