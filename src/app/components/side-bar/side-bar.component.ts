import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass']
})
export class SideBarComponent implements OnInit {  

  constructor(
    public mainService: MainService
  ) { }

  ngOnInit() {
    this.initializeValues();
  }

  initializeValues() {
    this.mainService.isListViewActive = false;
  }

}
