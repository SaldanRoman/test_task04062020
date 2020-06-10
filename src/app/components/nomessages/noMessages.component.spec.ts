import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoMessagesComponent } from './noMessages.component';

describe('NoMessagesComponent', () => {
  let component: NoMessagesComponent;
  let fixture: ComponentFixture<NoMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoMessagesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
