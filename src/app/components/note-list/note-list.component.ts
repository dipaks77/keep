import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { FormBuilder, Validators } from '@angular/forms';
import { debug } from 'util';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.sass']
})
export class NoteListComponent implements OnInit {

  // ref to dom element
  @ViewChild('takeNewNote', { static: false }) takeNewNote: ElementRef;

  // variables
  public form;
  public isSubmitted: boolean;

  // Dependencies
  constructor(
    private fb: FormBuilder,
    public mainService: MainService
  ) { }

  // Angular init life cycle
  ngOnInit() {
    this.initializeNoteData();
    this.createForm();
    this.bindKeyEvents();
    this.getNoteData();
  }

  // init data
  initializeNoteData() {
    this.mainService.noteService.noteItem = { title: '', note: '' };
    this.mainService.noteService.addNewCard = false;
    this.isSubmitted = false;
  }

  // create reactive form
  createForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      note: ['', Validators.required]
    });
  }

  // bind keyboard keys for special events
  bindKeyEvents() {

    // when user press esc key while adding new note
    document.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.keyCode == 27) {
        if (this.mainService.noteService.noteItem.title && this.mainService.noteService.noteItem.note) {
          this.addNewNote();
        } else {
          this.initializeNoteData();
        }
      }
    });
  }

  // get current logged in user's note data
  getNoteData() {
    let userData: any = this.mainService.getLocalStorage('loggedInUser'),
      url = '/note/' + userData.email;
    this.mainService.httpService.get(url).then((resp: any) => {
      this.mainService.noteService.noteData = resp.data;
    }).catch(err => {
      console.log("Error in fetching data: ", err);
    });
  }

  // add new note
  addNewNote() {

    // 
    this.isSubmitted = true;

    // 
    if (!this.form.valid) return;

    // 
    let userData: any = this.mainService.getLocalStorage('loggedInUser');

    // 
    let url = '/note';

    // 
    if (this.mainService.noteService.noteItem.hasOwnProperty('_id')) {
      url += '/' + this.mainService.noteService.noteItem['_id'];
      this.mainService.httpService.put(url, this.mainService.noteService.noteItem).then((resp: any) => {
        if (resp && resp.status == 'success') {
          this.mainService.noteService.noteData.push(resp.data);
          this.initializeNoteData();
        }
      }).catch(err => {
        console.log("Error in creating note: ", err);
      });
    } else {
      this.mainService.noteService.noteItem.email = userData.email;
      this.mainService.httpService.post(url, this.mainService.noteService.noteItem).then((resp: any) => {
        if (resp && resp.status == 'success') {
          this.mainService.noteService.noteData.push(resp.data);
          this.initializeNoteData();
        }
      }).catch(err => {
        console.log("Error in creating note: ", err);
      });
    }
  }

  // when user starts typing in Take a note field
  // show create new note panel
  enableAddNewNote() {
    this.mainService.noteService.addNewCard = true;
    setTimeout(() => {
      this.takeNewNote.nativeElement.focus();
    }, 100);
  }

  // shorthand of form control for html
  get nf() {
    return this.form.controls;
  }
}
