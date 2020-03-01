import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Dependencies
  constructor(
    private myRoute: Router,
    public mainService: MainService
  ) { }

  // set token to local storage
  sendToken(token: any) {
    this.mainService.setLocalStorage("loggedInUser", token);
  }

  // get token from local storage
  getToken() {
    return this.mainService.getLocalStorage("loggedInUser");
  }

  // return is user logged in or not
  isLoggedIn() {
    return this.getToken() !== null;
  }

  // remove token
  logout() {
    localStorage.removeItem("loggedInUser");
    this.myRoute.navigate(["login"]);
  }
}
