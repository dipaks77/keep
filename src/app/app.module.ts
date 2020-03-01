// Angular default
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { FilterPipe } from './_helper/filter.pipe';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PubSubModule } from 'angular7-pubsub';

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    CreateNoteComponent,
    SideBarComponent,
    NoteCardComponent,
    FilterPipe,
    LoginComponent,
    RegisterComponent
  ],
  imports: [    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PubSubModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
