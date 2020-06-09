import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  avatarUrl: string;
  name: string;
  logName: string;
  lastMessage?: string;
  id?: string;
  date?: Date;
  status?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  static url = 'https://reenbit-test-task.firebaseio.com/users';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${UsersService.url}.json`).pipe(
      map((user) => {
        return Object.keys(user).map((key) => ({ ...user[key], id: key }));
      })
    );
  }

  getCurentUser(logName: string): Observable<User[]> {
    return this.http.get<User[]>(`${UsersService.url}.json`).pipe(
      map((user) => {
        return Object.keys(user)
          .map((key) => ({ ...user[key], id: key }))
          .filter((user) => user.logName === logName);
      })
    );
  }

  putToCurentUser(id: string, user: User) {
    return this.http.put(`${UsersService.url}/${id}.json`, user);
  }
}
