import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AnswersService {
  constructor(private http: HttpClient) {}

  randonJoke() {
    this.http.get('https://api.chucknorris.io/jokes/random');
  }
}
