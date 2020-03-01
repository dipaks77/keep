import { Component, OnInit, Input, Output } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.sass']
})
export class NoteCardComponent implements OnInit {

  public fieldsToSearch;
  constructor(
    public mainService: MainService
  ) { }

  ngOnInit() {
    this.fieldsToSearch = ['title', 'note'];
  }

  ngAfterViewInit() {
  }

}
