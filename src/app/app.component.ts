import { Component, OnInit } from '@angular/core';
import { MessagesService, User } from './services/messages.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  form: FormGroup;
  users: Array<User> = [];
  sub$: Subscription;

  constructor(private messageService: MessagesService) {}

  getContacts() {
    this.messageService.getUser().subscribe((res) => {
      this.users = res;
    });
  }

  ngOnInit(): void {
    this.getContacts();

    this.sub$ = this.messageService.subj$
      .pipe(switchMap(() => this.messageService.getUser()))
      .subscribe((res) => {
        this.users = res;
      });

    this.form = new FormGroup({
      search: new FormControl(''),
    });

    this.form.valueChanges.subscribe((snap) => {
      if (!snap.search.trim()) {
        this.getContacts();
      } else {
        this.users = this.users.filter((contact: User) => {
          return (
            contact.name
              .toLocaleLowerCase()
              .indexOf(snap.search.toLowerCase().trim()) !== -1
          );
        });
      }
    });
  }
}
