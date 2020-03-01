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

  @ViewChild('takeNewNote', { static: false }) takeNewNote: ElementRef;
  public form;
  public isSubmitted: boolean;

  constructor(
    private fb: FormBuilder,
    public mainService: MainService
  ) { }

  ngOnInit() {
    this.initializeNoteData();
    this.createForm();
    this.bindKeyEvents();
    this.getNoteData();
  }

  initializeNoteData() {
    this.mainService.noteService.noteItem = { title: '', note: '' };
    this.mainService.noteService.addNewCard = false;
    this.isSubmitted = false;
  }

  createForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      note: ['', Validators.required]
    });
  }

  bindKeyEvents() {
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

  getNoteData() {
    let userData: any = this.mainService.getLocalStorage('loggedInUser'),
      url = '/note/' + userData.email;
    this.mainService.httpService.get(url).then((resp: any) => {
      this.mainService.noteService.noteData = resp.data;
    }).catch(err => {
      console.log("Error in fetching data: ", err);
    });
  }

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
      this.mainService.httpService.put(url, this.mainService.noteService.noteItem).then(resp => {
        this.mainService.noteService.noteData.push(this.mainService.noteService.noteItem);
        this.initializeNoteData();
      }).catch(err => {
        console.log("Error in creating note: ", err);
      });
    } else {
      this.mainService.noteService.noteItem.email = userData.email;
      this.mainService.httpService.post(url, this.mainService.noteService.noteItem).then(resp => {
        this.mainService.noteService.noteData.push(this.mainService.noteService.noteItem);
        this.initializeNoteData();
      }).catch(err => {
        console.log("Error in creating note: ", err);
      });
    }
  }

  enableAddNewNote() {
    this.mainService.noteService.addNewCard = true;
    setTimeout(() => {
      this.takeNewNote.nativeElement.focus();
    }, 100);
  }

  get nf() {
    return this.form.controls;
  }
}
