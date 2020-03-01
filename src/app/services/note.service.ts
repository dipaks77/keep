import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  public noteData: any = [];
  public noteItem: any = {};
  public addNewCard: boolean;

  constructor(
    public httpService: HttpService
  ) { }

  removeNote(noteId, index) {
    let self = this;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this note!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        let url = '/note/' + noteId;
        self.httpService.delete(url).then((resp: any) => {
          if (resp.status == 'success') {
            self.noteData.splice(index, 1);
          }
        }).catch(err => {
          console.log("Error in deleting note!", err);
        });
      }
    });
    // let noteIndex = this.noteData.findIndex(noteItem => noteItem.id == noteId);
    // if (noteIndex >= 0) {
    //   this.noteData.splice(noteIndex, 1);
    // }
  }

  editNote(noteItem) {
    console.log(noteItem);
    this.noteItem = noteItem;
    this.addNewCard = true;
  }
}

