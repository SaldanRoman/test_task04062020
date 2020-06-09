import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from './users.service';

export interface Dialog {
  value: string;
  isOutput?: boolean;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private http: HttpClient) {}
  subj$ = new Subject<User>();
  static url = 'https://reenbit-test-task.firebaseio.com/dialogs';

  getDialog(id: string) {
    return this.http.get(`${MessagesService.url}/${id}.json`);
  }

  putToDialogs(id: string, dialog: Array<Dialog>) {
    return this.http.put(`${MessagesService.url}/${id}.json`, dialog);
  }
}
