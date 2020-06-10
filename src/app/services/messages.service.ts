import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  static url = 'https://reenbit-test-task.firebaseio.com/dialogs';

  getDialog(id: string): Observable<Dialog[]> {
    return this.http.get<Dialog[]>(`${MessagesService.url}/${id}.json`);
  }

  putToDialogs(id: string, dialog: Dialog[]) {
    return this.http.put(`${MessagesService.url}/${id}.json`, dialog);
  }
}
