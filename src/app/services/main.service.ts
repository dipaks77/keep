import { Injectable } from '@angular/core';
import { NoteService } from './note.service';
import { HttpService } from './http.service';
import { PubSubService } from 'angular7-pubsub';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  // variables
  public isListViewActive: boolean;
  public searchText;

  // Dependencies
  constructor(
    public noteService: NoteService,
    public httpService: HttpService,
    public eventService: PubSubService
  ) { }

  // set localstorage with/without json data
  setLocalStorage(key, data, isJson: boolean = true) {
    if (isJson === true) {
      data = JSON.stringify(data);
    }
    localStorage.setItem(key, data);
  }

  // get localstorage with/without json data
  getLocalStorage(key, isJson: boolean = true) {
    let data = localStorage.getItem(key);
    if (isJson === true) {
      data = JSON.parse(data);
    }
    return data;
  }

  // to display sweetalert
  swal(title, message, type: any = 'error') {
    Swal.fire(title, message, type);
  }
}
