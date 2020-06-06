import { Component, OnInit } from '@angular/core';
import { MessagesService, User } from './services/messages.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UpdateService } from './services/update.service';
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
  counter = 1;
  constructor(
    private messageService: MessagesService,
    private updateService: UpdateService
  ) {}
  ngOnInit(): void {
    this.sub$ = this.updateService.subj$
      .pipe(switchMap(() => this.messageService.getUser()))
      .subscribe((res) => {
        this.users = res;
      });
    this.messageService.getUser().subscribe((res) => {
      this.users = res;
    });

    this.form = new FormGroup({
      search: new FormControl(''),
    });
  }
}
