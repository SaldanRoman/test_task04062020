import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface User {
  avatarurl: string;
  name: string;
  logname: string;
  lastmessage?: string;
  id?: string;
  date?: string;
}

export interface Dialog {
  value: string;
  isoutput: boolean;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private http: HttpClient) {}
  static url = 'https://reenbit-test-task.firebaseio.com';

  getUser() {
    return this.http.get(`${MessagesService.url}/users.json`).pipe(
      map((user) => {
        return Object.keys(user).map((key) => {
          return { ...user[key], id: key };
        });
      })
    );
  }

  getDialog(id: string) {
    return this.http.get(`${MessagesService.url}/dialogs/${id}.json`);
  }

  putToUser(id: string, user: User) {
    return this.http.put(`${MessagesService.url}/users/${id}.json`, user);
  }

  putToDialogs(id: string, dialog: Array<Dialog>) {
    return this.http.put(`${MessagesService.url}/dialogs/${id}.json`, dialog);
  }
}
