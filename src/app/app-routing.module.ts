import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NomessagesComponent } from './components/nomessages/nomessages.component';
import { MessagesComponent } from './components/messages/messages.component';

const routes: Routes = [
  { path: '', component: NomessagesComponent },
  { path: 'im/:contact', component: MessagesComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
