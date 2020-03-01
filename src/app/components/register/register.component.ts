import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  // variable
  public form;
  public isSubmitted: boolean;
  public user: any;

  // Dependencies
  constructor(
    private fb: FormBuilder,
    private myRoute: Router,
    private auth: AuthService,
    public mainService: MainService
  ) { }

  // Angular init life cycle
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.myRoute.navigate(["list"]);
    }
    this.initializeData();
    this.createForm();
  }

  // init data
  initializeData() {
    this.user = {
      name: '',
      email: '',
      password: ''
    };
    this.isSubmitted = false;    
  }

  // create reactive form
  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // signup user
  register() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.mainService.httpService.post('/user', this.user).then((resp: any) => {
        if (resp.status == 'success') {
          let token = {
            _id: resp.data._id,
            email: resp.data.email,
            name: resp.data.name
          };
          this.auth.sendToken(token);
          this.auth.mainService.eventService.$pub('userLoggedIn', token);
          this.myRoute.navigate(["list"]);
        }
      }).catch(err => {
        console.log("Error in creating user: ", err);
      });
    }
  }

  // shorthand of form controls for html
  get rf() {
    return this.form.controls;
  }

}
