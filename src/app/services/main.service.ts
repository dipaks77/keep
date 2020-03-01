import { Injectable } from '@angular/core';
import { NoteService } from './note.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  public isListViewActive: boolean;
  public searchText;
  
  constructor(
    public noteService: NoteService
  ) { }
}
