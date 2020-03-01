import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass']
})
export class SideBarComponent implements OnInit {

  public userData;

  constructor(
    public mainService: MainService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.initializeValues();
  }

  initializeValues() {
    this.userData = this.authService.getToken();
    this.mainService.isListViewActive = false;
    this.subscribeEvents();
  }

  subscribeEvents() {
    this.authService.mainService.eventService.$sub('userLoggedIn', userData => {
      this.userData = userData;
    });
  }

  ngOnDestroy() {
    this.userData = {};
  }
}
