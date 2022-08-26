import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '../../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {

    this.accountService.logout();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    var tmpUsers = <any>[];
    var username = this.f['username'].value;
    var password = this.f['password'].value;
    var loginStatus;
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    tmpUsers = localStorage.getItem('Users')
      ? localStorage.getItem('Users')
      : null;

    console.log('Part 1',tmpUsers);

    tmpUsers = tmpUsers ? JSON.parse(tmpUsers) : null;

    if (tmpUsers && tmpUsers.length > 0) {
      console.log('Part 2');

      loginStatus = await tmpUsers.find((user: any) => {
        if (user.email == username && user.password == password) {
          return true;
        }
        return false;
      });

      if (loginStatus) {
        console.log('Login Success');
        await this.accountService.login(username, password);
        this.alertService.success('Login Success');
        const returnUrl = '/home';
        this.router.navigateByUrl(returnUrl);
      } else {
        console.log('Failed');
        this.alertService.error('Invalid Username or Password');
      }
      this.loading = false;
    } else {
      // console.log('Part 3');

      this.alertService.info('Please register to login');
      this.loading = false;
    }
  }
}
