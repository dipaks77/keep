import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  public noteData: any = [];

  constructor() { }

  removeNote(noteId) {
    let noteIndex = this.noteData.findIndex(noteItem => noteItem.id == noteId);
    if(noteIndex >= 0) {
      this.noteData.splice(noteIndex, 1);
    }
  }
}
