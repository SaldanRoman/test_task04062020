import { Component, OnInit } from '@angular/core';
import { MessagesService, User } from './services/messages.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  form: FormGroup;
  users: Array<User> = [];
  constructor(private messageService: MessagesService) {
    this.messageService.getUser().subscribe((res) => {
      this.users = res;
    });
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl(''),
    });
  }
  img = 'https://pickaface.net/gallery/avatar/20151205_194059_2696_Chat.png';
}
