import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
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

  ngOnInit() {}

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    var tmpUsers;

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

    let userExistStatus = await this.usersArray.find((user: any) => {
      if (user.email == this.user.email) {
        return true;
      }
      return false;
    });

    if (!userExistStatus) {
      this.usersArray.push(this.user);

      console.log('this.usersArray  : ', this.usersArray);

      localStorage.setItem('Users', JSON.stringify(this.usersArray));

      this.loading = false;

      this.alertService.success('Registration successful. Please login !!!', {
        keepAfterRouteChange: true,
      });
      this.router.navigate(['../login'], { relativeTo: this.route });
    } else {
      this.alertService.warn('User Already Exists !!!');
      this.loading = false;
    }

  }
}
