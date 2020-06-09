import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoMessagesComponent } from './components/noMessages/noMessages.component';
import { MessagesComponent } from './components/messages/messages.component';

const routes: Routes = [
  { path: '', component: NoMessagesComponent },
  { path: 'im/:contact', component: MessagesComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
