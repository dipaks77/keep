import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  // variables
  public noteData: any = [];
  public noteItem: any = {};
  public addNewCard: boolean;

  // Dependencies
  constructor(
    public httpService: HttpService
  ) { }

  // remove note data
  removeNote(noteId, index) {
    let self = this;

    // confirm before removing
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this note!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {

      // if yes, begin process
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
  }

  // set note data and display edit item form
  editNote(noteItem) {
    this.noteItem = noteItem;
    this.addNewCard = true;
  }
}

