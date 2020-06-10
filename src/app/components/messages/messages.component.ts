import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessagesService, Dialog } from 'src/app/services/messages.service';
import { AnswersService, Answer } from 'src/app/services/answers.service';
import { UsersService, User } from 'src/app/services/users.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  @ViewChild('messagesDialogScroll', { static: true }) scrollFrame: ElementRef;
  form: FormGroup;
  dialog: Dialog[] = [];
  user: User = {
    name: 'Not found',
    avatarUrl: '',
    logName: '',
  };

  constructor(
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private usersService: UsersService,
    private router: Router,
    private answerService: AnswersService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      message: new FormControl('', Validators.required),
    });

    this.route.params
      .pipe(
        switchMap((logName) => {
          return this.usersService.getCurentUser(logName.contact);
        })
      )
      .subscribe((res: Array<User>) => {
        if (!res.length) {
          this.router.navigate(['/']);
        }
        this.user = res[0];
        this.messagesService.getDialog(res[0].id).subscribe((res: Dialog[]) => {
          if (!res) {
            this.dialog = [];
          } else {
            this.dialog = res;
            setTimeout(() => {
              this.scrollToBottom();
            }, 10);
          }
        });
      });
  }

  submit() {
    if (!this.form.value.message) {
      return;
    }
    const message: Dialog = {
      value: this.form.value.message,
      date: new Date(),
      isOutput: true,
    };
    this.dialog.push(message);
    this.updateDialog();
    this.updateContact();
    this.answer();
    this.form.reset();
  }

  answer() {
    this.answerService.randomJoke().subscribe((res: Answer) => {
      const answer: Dialog = {
        value: res.value,
        date: new Date(),
        isOutput: false,
      };
      this.dialog.push(answer);
      this.updateDialog();
      this.updateContact();
      this.scrollToBottom();
    });
  }

  updateDialog() {
    this.messagesService
      .putToDialogs(this.user.id, this.dialog)
      .subscribe(() => {
        this.scrollToBottom();
      });
  }

  updateContact() {
    this.user.lastMessage = this.dialog[this.dialog.length - 1].value;
    this.user.date = this.dialog[this.dialog.length - 1].date;

    this.usersService.putToCurentUser(this.user.id, this.user).subscribe(() => {
      this.usersService.updateUserSubscription$.next(this.user);
    });
  }

  scrollToBottom() {
    let scrollHeightOfDialogs = Array.from(
      this.scrollFrame.nativeElement.children
    ).reduce((acc, elm: any) => acc + elm.scrollHeight, 0);
    this.scrollFrame.nativeElement.scrollTop = scrollHeightOfDialogs;
  }
}
