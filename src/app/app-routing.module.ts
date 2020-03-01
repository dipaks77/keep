import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoteListComponent } from './components/note-list/note-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'list',pathMatch:'full' },
  { path: 'list', component: NoteListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
