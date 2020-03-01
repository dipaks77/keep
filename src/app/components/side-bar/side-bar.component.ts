import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass']
})
export class SideBarComponent implements OnInit {

  // logged in user's data
  public userData;

  // Dependencies
  constructor(
    public mainService: MainService,
    public authService: AuthService
  ) { }

  // Angular init life cycle
  ngOnInit() {
    this.initializeValues();
  }

  // init data
  initializeValues() {
    this.userData = this.authService.getToken();
    this.mainService.isListViewActive = false;
    this.subscribeEvents();
  }

  // subscrbe pubsub events
  subscribeEvents() {
    this.authService.mainService.eventService.$sub('userLoggedIn', userData => {
      this.userData = userData;
    });
  }

  // when this component is destroyed, reset users data
  ngOnDestroy() {
    this.userData = {};
  }
}
