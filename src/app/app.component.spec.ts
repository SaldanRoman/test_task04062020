import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SearchContactPipe } from './pipes/search-contact.pipe';
import { NoMessagesComponent } from './components/noMessages/noMessages.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { MessagesComponent } from './components/messages/messages.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        ContactsComponent,
        MessagesComponent,
        NoMessagesComponent,
        SearchContactPipe,
      ],
    }).compileComponents();
  }));
});
it('should create the app', () => {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.componentInstance;
  expect(app).toBeTruthy();
});
