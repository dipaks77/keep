import { Injectable } from '@angular/core';
import { NoteService } from './note.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  public isListViewActive: boolean;
  public searchText;
  
  constructor(
    public noteService: NoteService,
    public httpService: HttpService
  ) { }
}
