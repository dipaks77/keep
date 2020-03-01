// Angular default
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { FilterPipe } from './_helper/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    CreateNoteComponent,
    SideBarComponent,
    NoteCardComponent,
    FilterPipe
  ],
  imports: [    
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
