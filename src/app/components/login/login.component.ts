import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  // Variables
  public form;
  public isSubmitted: boolean;
  public user: any;

  // Dependencies
  constructor(
    private fb: FormBuilder,
    private myRoute: Router,
    private auth: AuthService
  ) { }

  // Angular init life cycle
  ngOnInit() {

    // if user has already logged in, redirect note list
    if (this.auth.isLoggedIn()) {
      this.myRoute.navigate(["list"]);
    }

    // init values
    this.initializeData();
  }

  // init default values
  initializeData() {

    // init user data
    this.user = {
      email: '',
      password: ''
    };

    // to hide errors on form load
    this.isSubmitted = false;

    // create login reactive form
    this.createForm();
  }

  // create login reactive form
  createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // login user
  login() {

    // set flag to show errors
    this.isSubmitted = true;

    // if form is valid
    if (this.form.valid) {

      // hit url
      this.auth.mainService.httpService.post('/user/login', this.user).then((resp: any) => {

        // if status is successful
        if (resp.status == 'success') {

          // create token to store it in local storage
          let token = {
            _id: resp.data._id,
            email: resp.data.email,
            name: resp.data.name
          };

          // set token via auth
          this.auth.sendToken(token);

          // publish event to reset user data
          this.auth.mainService.eventService.$pub('userLoggedIn', token);

          // redirect to list
          this.myRoute.navigate(["list"]);
        } else {

          // display error message
          this.auth.mainService.swal('Error', 'Invalid Login Credentials');
        }
      }).catch(err => {
        console.log("Error in logging in: ", err);
      });
    }
  }

  // shorthand of form controls for html
  get lf() {
    return this.form.controls;
  }

}
