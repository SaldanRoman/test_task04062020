import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Answer {
  categories?: [];
  created_at?: string;
  icon_url?: string;
  id: string;
  updated_at: Date;
  url?: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class AnswersService {
  constructor(private http: HttpClient) {}

  randomJoke() {
    return this.http.get('https://api.chucknorris.io/jokes/random');
  }
}
