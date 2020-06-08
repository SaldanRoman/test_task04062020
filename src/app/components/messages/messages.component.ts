import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MessagesService,
  User,
  Dialog,
} from 'src/app/services/messages.service';
import { AnswersService, Answer } from 'src/app/services/answers.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  @ViewChild('messagesDialogScroll', { static: true }) scrollFrame: ElementRef;
  form: FormGroup;
  dialog: Dialog[] = [];
  user: User = {
    name: 'Not found',
    avatarurl: '',
    logname: '',
  };

  constructor(
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private answerService: AnswersService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      message: new FormControl('', Validators.required),
    });

    this.route.params
      .pipe(
        switchMap((logname) => {
          return this.messagesService.getUser(logname.contact);
        })
      )
      .subscribe((res: Array<User>) => {
        if (!res.length) {
          this.router.navigate(['/']);
        }
        this.user = res[0];
        this.messagesService
          .getDialog(res[0].id)
          .subscribe((res: Array<Dialog>) => {
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
      isoutput: true,
    };
    this.dialog.push(message);
    this.updateDialog();
    this.updateContact();
    this.answer();
    this.form.reset();
  }

  answer() {
    this.answerService.randonJoke().subscribe((res: Answer) => {
      const answer: Dialog = {
        value: res.value,
        date: new Date(),
        isoutput: false,
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
    this.user.lastmessage = this.dialog[this.dialog.length - 1].value;
    this.user.date = this.dialog[this.dialog.length - 1].date;

    this.messagesService.putToUser(this.user.id, this.user).subscribe(() => {
      this.messagesService.subj$.next();
    });
  }

  scrollToBottom() {
    let scrollHeightOfDialogs = Array.from(
      this.scrollFrame.nativeElement.children
    ).reduce((acc, elm: any) => acc + elm.scrollHeight, 0);
    this.scrollFrame.nativeElement.scrollTop = scrollHeightOfDialogs;
  }
}
