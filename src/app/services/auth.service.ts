import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private myRoute: Router,
    public mainService: MainService
  ) { }

  sendToken(token: any) {
    this.mainService.setLocalStorage("loggedInUser", token);
    // localStorage.setItem("LoggedInUser", token)
  }

  getToken() {
    return this.mainService.getLocalStorage("loggedInUser");
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem("loggedInUser");
    this.myRoute.navigate(["login"]);
  }
}
