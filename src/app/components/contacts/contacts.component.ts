import { Component, OnInit } from '@angular/core';
import { User, UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  search = '';
  users: Array<User> = [];
  sub$: Subscription;

  constructor(
    private messageService: MessagesService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((res) => {
      this.users = res;
    });
    this.sub$ = this.messageService.subj$.subscribe((curentUser: User) => {
      this.users = this.users.map((user) =>
        user.id === curentUser.id ? (user = curentUser) : user
      );
    });
  }
}
