import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private messagesService: MessagesService
  ) {}
  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      message: new FormControl('', Validators.required),
    });

    this.route.params.subscribe((res) => console.log(res));
  }

  submit() {
    this.form.reset();
  }

  img = 'https://pickaface.net/gallery/avatar/20151205_194059_2696_Chat.png';

  dialogs = [
    {
      value: 'asdaareydfbngnd swsdvzd !!',
      date: new Date(),
      isOutput: true,
    },
  ];
}
