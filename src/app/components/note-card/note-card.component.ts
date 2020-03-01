import { Component, OnInit, Input, Output } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.sass']
})
export class NoteCardComponent implements OnInit {

  // list of fields to be searched from list
  public fieldsToSearch;

  // Dependencies
  constructor(
    public mainService: MainService
  ) { }

  // Angular init life cycle
  ngOnInit() {
    this.initializeData();
  }

  // init data
  initializeData() {
    this.fieldsToSearch = ['title', 'note'];
  }
}
