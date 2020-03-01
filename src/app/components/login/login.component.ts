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

  public form;
  public isSubmitted: boolean;
  public user: any;

  constructor(
    private fb: FormBuilder,
    private myRoute: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.myRoute.navigate(["list"]);
    }
    this.initializeData();
  }

  initializeData() {
    this.user = {
      email: '',
      password: ''
    };
    this.isSubmitted = false;
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.auth.mainService.httpService.post('/user/login', this.user).then((resp: any) => {
        if (resp.status == 'success') {
          let token = {
            _id: resp.data._id,
            email: resp.data.email,
            name: resp.data.name
          };
          this.auth.sendToken(token);
          this.auth.mainService.eventService.$pub('userLoggedIn', token);
          this.myRoute.navigate(["list"]);
        } else {
          this.auth.mainService.swal('Error', 'Invalid Login Credentials');
        }
      }).catch(err => {
        console.log("Error in logging in: ", err);
      });
    }
  }

  get lf() {
    return this.form.controls;
  }

}
