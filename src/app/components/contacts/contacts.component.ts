import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit, OnDestroy {
  search = '';
  users: Array<User> = [];
  sub$: Subscription;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((res) => {
      this.users = res;
    });
    this.sub$ = this.usersService.updateUserSubscription$.subscribe(
      (curentUser: User) => {
        this.users = this.users.map((user) =>
          user.id === curentUser.id ? (user = curentUser) : user
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
