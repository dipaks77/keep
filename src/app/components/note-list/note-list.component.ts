import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.sass']
})
export class NoteListComponent implements OnInit {

  @ViewChild('takeNewNote', { static: false }) takeNewNote: ElementRef;
  public noteMsg: string;
  public noteTitle: string;
  public addNewCard: boolean;

  constructor(
    public mainService: MainService
  ) { }

  ngOnInit() {
    this.initializeNoteData();
  }

  initializeNoteData() {
    this.noteMsg = '';
    this.addNewCard = false;
    this.mainService.httpService.get('assets/json/noteData.json').then(jsonData => {

    }).catch(err => {
      console.log("Error in fetching json data: ", err);
    });
    this.bindKeyEvents();
  }

  bindKeyEvents() {
    document.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.keyCode == 27) {
        if (this.noteTitle && this.noteMsg) {
          this.addNewNote();
        } else {
          this.addNewCard = false;
          this.noteMsg = '';
        }
      }
    });
  }

  addNewNote() {
    const jsonObject = {
      id: this.mainService.noteService.noteData.length,
      title: this.noteTitle,
      noteMsg: this.noteMsg
    };
    this.mainService.noteService.noteData.push(jsonObject);
    this.noteTitle = '';
    this.noteMsg = '';
    this.addNewCard = false;
  }

  enableAddNewNote() {
    this.addNewCard = true;
    setTimeout(() => {
      this.takeNewNote.nativeElement.focus();
    }, 100);
  }
}
