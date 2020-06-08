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
  search = '';
  users: Array<User> = [];
  sub$: Subscription;

  constructor(private messageService: MessagesService) {}

  ngOnInit(): void {
    this.messageService.getUser().subscribe((res) => {
      this.users = res;
    });
    this.sub$ = this.messageService.subj$
      .pipe(switchMap(() => this.messageService.getUser()))
      .subscribe((res) => {
        this.users = res;
      });

    this.form = new FormGroup({
      search: new FormControl(''),
    });
  }
}
